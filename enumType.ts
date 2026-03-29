// enum types are a way to define a set of named constants. They can be numeric or string-based. Enums provide a way to organize and manage related values, making code more readable and maintainable.
{
    enum OrderStatus {
        Pending = "Pending",
        Processing = "Processing",
        Shipped = "Shipped",
        Delivered = "Delivered",
        Cancelled = "Cancelled"
    }
    let status: OrderStatus = OrderStatus.Pending;
    console.log(`Current order status: ${status}`);
}


