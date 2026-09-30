import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  getCountFromServer,
  orderBy
} from 'firebase/firestore';

import { db } from '../db/firebase';
import { FindDocumentCriteria } from '../interfaces/utils.interfaces';
import { Order } from '../interfaces/order.interface';

const collectionName = 'orders';

class OrderService {

  public async getOrders(): Promise<Order[]> {
    const querySnapshot = await getDocs(collection(db, collectionName));

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as any,
    }));
  }

  public async createOrder(order: Order): Promise<Order> {
    const body = { ...order } as any;
    delete body.id;
    const response = await addDoc(collection(db, collectionName), body);

    return { id: response.id, ...body };
  }

  public async getOrderById(id: string): Promise<Order> {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Order;
  }

  public async updateOrder(id: string, order: any) {
    const body = { ...order } as any;
    delete body.id;
    const docRef = doc(db, collectionName, id);

    await updateDoc(docRef, body);
  }

  public async getOrdersByCriteria(criteria: FindDocumentCriteria): Promise<Order[]> {
    const q = query(
      collection(db, collectionName),
      where(criteria.field, '==', criteria.value)
    );

    const snapshot = await getDocs(q);

    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];

    orders.sort((a, b) => Number(a.identifier) - Number(b.identifier));

    return orders;
  }

  public async getOrdersCountByCriteria(criteria: FindDocumentCriteria): Promise<number> {
    const q = query(
      collection(db, collectionName),
      where(criteria.field, '==', criteria.value)
    );

    const snapshot = await getCountFromServer(q);

    return snapshot.data().count;
  }

}

export const orderService = new OrderService();
