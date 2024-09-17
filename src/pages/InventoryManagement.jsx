import axios from "axios";
import { useEffect, useState } from "react";

function InventoryManagement() {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: "", unit: "" });

  // Fetch the inventory when the component loads or when a new item is added
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const { token } = JSON.parse(localStorage.getItem("currentUser"));
        const response = await axios.get(
          "http://localhost:3000/api/v1/hospital/view-medicine",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInventory(response.data);
      } catch (err) {
        console.log("Error fetching inventory", err);
      }
    };
    fetchInventory();
  }, [setInventory]); // [] ensures it only runs once when the component mounts

  const handleAddItem = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const { token } = JSON.parse(localStorage.getItem("currentUser"));
      const response = await axios.post(
        "http://localhost:3000/api/v1/hospital/add-medicine",
        {
          name: newItem.name,
          quantity: newItem.quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Item added successfully");
      // Update the inventory with the new item
      setInventory([...inventory, response.data]);
      setNewItem({ name: "", quantity: "", unit: "" }); // Clear the form after submission
    } catch (err) {
      console.log("Error adding item", err);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-green-600 mb-8">
        Inventory Management
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {inventory.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-green-600 mb-2">
              {item.name}
            </h3>
            <p className="text-gray-600 mb-4">
              Quantity: {item.quantity} {item.unit}
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
              Update Stock
            </button>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-green-600 mb-4">Add New Item</h3>
        <form onSubmit={handleAddItem}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Item Name:
            </label>
            <input
              type="text"
              id="name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="quantity"
            >
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              value={newItem.quantity}
              onChange={(e) =>
                setNewItem({ ...newItem, quantity: e.target.value })
              }
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="unit"
            >
              Unit:
            </label>
            <input
              type="text"
              id="unit"
              value={newItem.unit}
              onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default InventoryManagement;
