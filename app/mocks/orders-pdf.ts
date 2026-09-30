export function buildLabelsHtml(labelsHtml: string): string {
  return `
    <html>
      <head>
        <meta charset="utf-8"/>

        <style>

          body {
            font-family: Arial, sans-serif;
          }

          .container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 100%;
          }

          .label {
            width: 48%;
            border: 1px solid black;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 12px;
            box-sizing: border-box;

            page-break-inside: avoid;
            break-inside: avoid;
          }

          .order-number {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 12px;
          }

          .customer-name {
            font-size: 16px;
            margin-bottom: 8px;
          }

          .phone {
            font-size: 14px;
            margin-bottom: 12px;
          }

          .total {
            font-size: 18px;
            font-weight: bold;
          }

        </style>
      </head>

      <body>
        <div class="container">
          ${labelsHtml}
        </div>
      </body>
    </html>
  `;
};
