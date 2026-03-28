interface Company {
  name: string;
  id: string;
  taxId: string;
  address: string;
  manager: string;
}

interface IssuerCompany extends Company {
  iban: string; // IBAN is mandatory for issuer
}


interface InvoiceItem {
  product: string;
  quantity: number;
  unit: string;
  price: number;
  vatRate: number;
  valueNoVat: number; // without VAT
}

interface Invoice {
  id: string;
  date: string;
  issuer: IssuerCompany;
  recipient: Company
  items: InvoiceItem[];
  subtotal: number;
  vatAmount: number;
  total: number;
}


interface ValidationResult {
  isValid: boolean;
  errors: string[];
}


function validateInvoice(invoice: Invoice): ValidationResult {
  const errors: string[] = [];

  // Invoice number/id
  if (!invoice.id || invoice.id.trim() === "") errors.push("Invoice number cannot be empty.");
  if (!invoice.id) errors.push("Invoice ID is missing.");

  // Invoice date
  if (!invoice.date) {
    errors.push("Invoice date is missing.");
  } else {
    const date = new Date(invoice.date);
    if (isNaN(date.getTime())) {
      errors.push("Invoice date is invalid.");
    } else {
      const now = new Date();
      if (date > now) errors.push("Invoice date cannot be in the future.");
    }
  }

  // Issuer company
  if (!invoice.issuer) {
    errors.push("Issuer company information is missing.");
  } else {
    if (!invoice.issuer.name) errors.push("Issuer company name is missing.");
    if (!invoice.issuer.id) errors.push("Issuer company ID is missing.");
    if (!invoice.issuer.iban) {
      errors.push("Issuer company IBAN is missing.");
    } else {
      // Simple IBAN format check (not exhaustive)
      const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/;
      if (!ibanRegex.test(invoice.issuer.iban.replace(/\s+/g, ""))) {
        errors.push("Issuer company IBAN format is invalid.");
      }
    }
  }

  // Recipient company
  if (!invoice.recipient) {
    errors.push("Recipient company information is missing.");
  } else {
    if (!invoice.recipient.name) errors.push("Recipient company name is missing.");
    if (!invoice.recipient.id) errors.push("Recipient company ID is missing.");
  }

  // Items
  if (!Array.isArray(invoice.items) || invoice.items.length === 0) {
    errors.push("Invoice must have at least one item.");
  } else {
    invoice.items.forEach((item, idx) => {
      const itemNum = idx + 1;
      if (!item.product) errors.push(`Item ${itemNum}: product name is missing.`);
      if (!item.unit) errors.push(`Item ${itemNum}: unit is missing.`);
      if (item.quantity == null || isNaN(item.quantity)) {
        errors.push(`Item ${itemNum}: quantity is missing or invalid.`);
      } else if (item.quantity <= 0) {
        errors.push(`Item ${itemNum}: quantity must be greater than zero.`);
      }
      if (item.price == null || isNaN(item.price)) {
        errors.push(`Item ${itemNum}: price is missing or invalid.`);
      } else if (item.price < 0) {
        errors.push(`Item ${itemNum}: price cannot be negative.`);
      }
      if (item.vatRate == null || isNaN(item.vatRate)) {
        errors.push(`Item ${itemNum}: VAT rate is missing or invalid.`);
      } else if (item.vatRate < 0) {
        errors.push(`Item ${itemNum}: VAT rate cannot be negative.`);
      }
      if (item.valueNoVat == null || isNaN(item.valueNoVat)) {
        errors.push(`Item ${itemNum}: value (no VAT) is missing or invalid.`);
      } else {
        // Check valueNoVat calculation
        const expectedValue = item.quantity * item.price;
        if (Math.abs(item.valueNoVat - expectedValue) > 0.01) {
          errors.push(`Item ${itemNum}: value calculation is incorrect.`);
        }
      }
    });
  }

  // Subtotal
  const calcSubtotal = invoice.items ? invoice.items.reduce((sum, item) => sum + item.valueNoVat, 0) : 0;
  if (Math.abs((invoice.subtotal ?? 0) - calcSubtotal) > 0.01) {
    errors.push(`Subtotal does not match the sum of items.`);
  }

  // VAT
  const calcVatAmount = invoice.items ? invoice.items.reduce((sum, item) => sum + item.valueNoVat * (item.vatRate / 100), 0) : 0;
  if ((invoice.vatAmount ?? 0) < 0) {
    errors.push("Total VAT cannot be negative.");
  }
  if (Math.abs((invoice.vatAmount ?? 0) - calcVatAmount) > 0.01) {
    errors.push("Total VAT does not match sum of item VAT.");
  }

  // Total
  const calcTotal = calcSubtotal + calcVatAmount;
  if (Math.abs((invoice.total ?? 0) - calcTotal) > 0.01) {
    errors.push("Total amount calculation is incorrect.");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}


// Example invoice for testing
const sampleInvoice: Invoice = {
  id: "INV-2026-001",
  date: "2026-03-25",
  issuer: {
    name: "Acme Corp",
    id: "ACME123",
    taxId: "BG123456789",
    address: "123 Main St, Sofia, Bulgaria",
    manager: "John Doe",
    iban: "BG80BNBG96611020345678"
  },
  recipient: {
    name: "Beta Ltd",
    id: "BETA456",
    taxId: "BG987654321",
    address: "456 Side St, Plovdiv, Bulgaria",
    manager: "Jane Smith"
  },
  items: [
    {
      product: "Laptop",
      quantity: 2,
      unit: "pcs",
      price: 1200,
      vatRate: 20,
      valueNoVat: 2400
    },
    {
      product: "Mouse",
      quantity: 3,
      unit: "pcs",
      price: 25,
      vatRate: 20,
      valueNoVat: 75
    }
  ],
  subtotal: 2475,
  vatAmount: 495,
  total: 2970
};

// Invoice with 5 mistakes for testing
const badInvoice: Invoice = {
  id: "", // Mistake 1: empty id
  date: "2027-01-01", // Mistake 2: date in the future
  issuer: {
    name: "", // Mistake 3: missing issuer name
    id: "ACME123",
    taxId: "BG123456789",
    address: "123 Main St, Sofia, Bulgaria",
    manager: "John Doe",
    iban: "BG80BNBG96611020345678"
  },
  recipient: {
    name: "Beta Ltd",
    id: "", // Mistake 4: missing recipient id
    taxId: "BG987654321",
    address: "456 Side St, Plovdiv, Bulgaria",
    manager: "Jane Smith"
  },
  items: [
    {
      product: "Laptop",
      quantity: 0, // Mistake 5: quantity must be greater than zero
      unit: "pcs",
      price: 1200,
      vatRate: 20,
      valueNoVat: 0
    }
  ],
  subtotal: 0,
  vatAmount: 0,
  total: 0
};

const validationResult = validateInvoice(badInvoice);
console.log("Is invoice valid?", validationResult.isValid);
if (!validationResult.isValid) {
  console.log("Errors:");
  validationResult.errors.forEach(err => console.log(" -", err));
}