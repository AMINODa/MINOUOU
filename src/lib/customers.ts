<<<<<<< HEAD
// قاعدة بيانات العملاء الحقيقيين
export const realCustomers = [
  {
    id: 101,
    username: "ahmed.karim",
    password: "Ahmed123",
    name: "أحمد كريم",
    accountNumber: "DZ59 1234 5678 9012 3456",
    balance: 0,
    email: "ahmed.karim@example.com",
    phone: "0555123456",
    address: "الجزائر العاصمة",
    idNumber: "29384756",
    dob: "1990-05-15",
    status: "نشط",
    accounts: [
      {
        id: 1001,
        type: "جاري",
        currency: "دينار جزائري",
        number: "DZ59 1234 5678 9012 3456",
        balance: 0,
        status: "نشط",
      },
    ],
  },
  {
    id: 102,
    username: "fatima.ahmed",
    password: "Fatima123",
    name: "فاطمة أحمد",
    accountNumber: "DZ59 2345 6789 0123 4567",
    balance: 0,
    email: "fatima.ahmed@example.com",
    phone: "0555234567",
    address: "وهران",
    idNumber: "38475612",
    dob: "1988-10-20",
    status: "نشط",
    accounts: [
      {
        id: 1002,
        type: "جاري",
        currency: "دينار جزائري",
        number: "DZ59 2345 6789 0123 4567",
        balance: 0,
        status: "نشط",
      },
    ],
  },
  {
    id: 103,
    username: "mohamed.ali",
    password: "Mohamed123",
    name: "محمد علي",
    accountNumber: "DZ59 3456 7890 1234 5678",
    balance: 0,
    email: "mohamed.ali@example.com",
    phone: "0555345678",
    address: "قسنطينة",
    idNumber: "47561238",
    dob: "1992-03-25",
    status: "نشط",
    accounts: [
      {
        id: 1003,
        type: "جاري",
        currency: "دينار جزائري",
        number: "DZ59 3456 7890 1234 5678",
        balance: 0,
        status: "نشط",
      },
    ],
  },
  {
    id: 104,
    username: "sara.khalid",
    password: "Sara123",
    name: "سارة خالد",
    accountNumber: "DZ59 4567 8901 2345 6789",
    balance: 0,
    email: "sara.khalid@example.com",
    phone: "0555456789",
    address: "عنابة",
    idNumber: "56123847",
    dob: "1995-07-10",
    status: "نشط",
    accounts: [
      {
        id: 1004,
        type: "جاري",
        currency: "دينار جزائري",
        number: "DZ59 4567 8901 2345 6789",
        balance: 0,
        status: "نشط",
      },
    ],
  },
  {
    id: 105,
    username: "khaled.omar",
    password: "Khaled123",
    name: "خالد عمر",
    accountNumber: "DZ59 5678 9012 3456 7890",
    balance: 0,
    email: "khaled.omar@example.com",
    phone: "0555567890",
    address: "سطيف",
    idNumber: "61238475",
    dob: "1985-12-05",
    status: "نشط",
    accounts: [
      {
        id: 1005,
        type: "جاري",
        currency: "دينار جزائري",
        number: "DZ59 5678 9012 3456 7890",
        balance: 0,
        status: "نشط",
      },
    ],
  },
];

// وظائف إدارة العملاء
export const customerService = {
  // الحصول على جميع العملاء
  getAllCustomers: () => {
    return [...realCustomers];
  },

  // الحصول على عميل بواسطة اسم المستخدم وكلمة المرور
  authenticateCustomer: (username: string, password: string) => {
    return realCustomers.find(
      (customer) =>
        customer.username === username && customer.password === password,
    );
  },

  // الحصول على عميل بواسطة المعرف
  getCustomerById: (id: number) => {
    return realCustomers.find((customer) => customer.id === id);
  },

  // الحصول على عميل بواسطة رقم الحساب
  getCustomerByAccountNumber: (accountNumber: string) => {
    return realCustomers.find(
      (customer) => customer.accountNumber === accountNumber,
    );
  },

  // تحديث رصيد العميل
  updateCustomerBalance: (
    id: number,
    amount: number,
    operation: "add" | "subtract" | "set",
  ) => {
    const customerIndex = realCustomers.findIndex(
      (customer) => customer.id === id,
    );
    if (customerIndex === -1) return null;

    const customer = realCustomers[customerIndex];

    if (operation === "add") {
      customer.balance += amount;
      // تحديث رصيد الحساب الجاري أيضًا
      if (customer.accounts && customer.accounts.length > 0) {
        customer.accounts[0].balance += amount;
      }
    } else if (operation === "subtract") {
      if (customer.balance >= amount) {
        customer.balance -= amount;
        // تحديث رصيد الحساب الجاري أيضًا
        if (customer.accounts && customer.accounts.length > 0) {
          customer.accounts[0].balance -= amount;
        }
      } else {
        return { error: "رصيد غير كافي" };
      }
    } else if (operation === "set") {
      customer.balance = amount;
      // تحديث رصيد الحساب الجاري أيضًا
      if (customer.accounts && customer.accounts.length > 0) {
        customer.accounts[0].balance = amount;
      }
    }

    return customer;
  },

  // إضافة حساب جديد للعميل
  addAccountToCustomer: (customerId: number, accountData: any) => {
    const customerIndex = realCustomers.findIndex(
      (customer) => customer.id === customerId,
    );
    if (customerIndex === -1) return null;

    const customer = realCustomers[customerIndex];
    const newAccountId = customer.accounts
      ? Math.max(...customer.accounts.map((acc) => acc.id)) + 1
      : 1001;

    const newAccount = {
      id: newAccountId,
      ...accountData,
    };

    if (!customer.accounts) {
      customer.accounts = [];
    }

    customer.accounts.push(newAccount);
    return customer;
  },

  // تغيير حالة العميل
  updateCustomerStatus: (id: number, status: string) => {
    const customerIndex = realCustomers.findIndex(
      (customer) => customer.id === id,
    );
    if (customerIndex === -1) return null;

    realCustomers[customerIndex].status = status;
    return realCustomers[customerIndex];
  },
};
=======
// Customer service for authentication and customer management
import { supabase } from "./supabase";

// Define a simple customer interface
interface Customer {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  account_number?: string;
  balance?: number;
  currency?: string;
  created_at?: string;
}

// Sample customers for testing (normally these would come from the database)
const sampleCustomers: Customer[] = [
  {
    id: "1",
    username: "ahmad",
    password: "password123",
    name: "أحمد محمد",
    email: "ahmad@example.com",
    phone: "0501234567",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmad",
    account_number: "1000-1234-5678",
    balance: 25000,
    currency: "SAR",
    created_at: "2024-01-15T08:30:00Z",
  },
  {
    id: "2",
    username: "sara",
    password: "password123",
    name: "سارة عبدالله",
    email: "sara@example.com",
    phone: "0559876543",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sara",
    account_number: "1000-8765-4321",
    balance: 18500,
    currency: "SAR",
    created_at: "2024-02-20T14:45:00Z",
  },
];

class CustomerService {
  // Authenticate a customer with username and password
  authenticateCustomer(username: string, password: string): Customer | undefined {
    // First try to find the customer in the sample data
    const customer = sampleCustomers.find(
      (c) => c.username === username && c.password === password
    );

    if (customer) {
      return customer;
    }

    // If not found in sample data, return undefined
    // In a real application, we would check the database here
    return undefined;
  }

  // Get all customers
  async getAllCustomers(): Promise<Customer[]> {
    try {
      const { data, error } = await supabase.from("customers").select("*");
      
      if (error) {
        console.error("Error fetching customers:", error);
        return sampleCustomers; // Fallback to sample data
      }
      
      return data as Customer[];
    } catch (err) {
      console.error("Error in getAllCustomers:", err);
      return sampleCustomers; // Fallback to sample data
    }
  }

  // Get customer by ID
  async getCustomerById(id: string): Promise<Customer | undefined> {
    try {
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) {
        console.error("Error fetching customer:", error);
        return sampleCustomers.find(c => c.id === id); // Fallback to sample data
      }
      
      return data as Customer;
    } catch (err) {
      console.error("Error in getCustomerById:", err);
      return sampleCustomers.find(c => c.id === id); // Fallback to sample data
    }
  }

  // Create a new customer
  async createCustomer(customer: Omit<Customer, "id">): Promise<Customer | undefined> {
    try {
      const { data, error } = await supabase
        .from("customers")
        .insert([customer])
        .select();
      
      if (error) {
        console.error("Error creating customer:", error);
        return undefined;
      }
      
      return data[0] as Customer;
    } catch (err) {
      console.error("Error in createCustomer:", err);
      return undefined;
    }
  }

  // Update an existing customer
  async updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer | undefined> {
    try {
      const { data, error } = await supabase
        .from("customers")
        .update(updates)
        .eq("id", id)
        .select();
      
      if (error) {
        console.error("Error updating customer:", error);
        return undefined;
      }
      
      return data[0] as Customer;
    } catch (err) {
      console.error("Error in updateCustomer:", err);
      return undefined;
    }
  }

  // Delete a customer
  async deleteCustomer(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("customers")
        .delete()
        .eq("id", id);
      
      if (error) {
        console.error("Error deleting customer:", error);
        return false;
      }
      
      return true;
    } catch (err) {
      console.error("Error in deleteCustomer:", err);
      return false;
    }
  }
}

export const customerService = new CustomerService();
>>>>>>> 9f77d8f (first commit)
