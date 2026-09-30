import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  writeBatch,
  query,
  where,
  getDoc
} from 'firebase/firestore';

import { db } from '../db/firebase';
import { Product } from '../interfaces/product.interface';

const collectionName = 'products-orders';

class ProductService {
  public async createProducts(products: Product[]) {
    const batch = writeBatch(db);

    products.forEach(product => {
      const body = { ...product } as any;
      delete body.id;
      const docRef = doc(collection(db, collectionName));
      batch.set(docRef, body);
    });

    await batch.commit();
  }

  public async createProduct(products: Product) {
    const body = { ...products } as any;
    delete body.id;
    const response = await addDoc(collection(db, collectionName), body);

    return { id: response.id, ...body };
  }

  public async deleteProducts(productId: string) {
    await deleteDoc(doc(db, collectionName, productId));
  }

  public async getProducts(): Promise<Product[]> {
    const querySnapshot = await getDocs(collection(db, collectionName));

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as any,
    }));
  }

  public async getProductsByStatus(status: string): Promise<Product[]> {
    const q = query(
      collection(db, collectionName),
      where('purchaseStatus', '==', status)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  }

  public async getProductsByOrder(orderId: string): Promise<Product[]> {
    const q = query(
      collection(db, collectionName),
      where('orderId', '==', orderId)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  }

  public async updateProduct(product: Product): Promise<Product> {
    const body = { ...product } as any;
    delete body.id;
    const docRef = doc(db, collectionName, product.id);

    await updateDoc(docRef, body);

    return {
      id: product.id,
      ...body
    };
  }

  public async getProductById(id: string): Promise<Product> {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Product;
  }

  public async deleteProductsByOrderId(orderId: string): Promise<void> {
    const q = query(
      collection(db, 'products-orders'),
      where('orderId', '==', orderId)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return;
    }

    const batch = writeBatch(db);

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
}
}

export const productService = new ProductService();
