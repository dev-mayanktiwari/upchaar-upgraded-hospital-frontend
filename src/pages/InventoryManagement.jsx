import { useState } from "react";

function InventoryManagement() {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Surgical Masks", quantity: 1000, unit: "pcs" },
    { id: 2, name: "Disposable Gloves", quantity: 5000, unit: "pairs" },
    { id: 3, name: "Syringes", quantity: 2000, unit: "pcs" },
  ]);

  const [newItem, setNewItem] = useState({ name: "", quantity: "", unit: "" });

  const handleAddItem = (e) => {
    e.preventDefault();
    setInventory([...inventory, { id: Date.now(), ...newItem }]);
    setNewItem({ name: "", quantity: "", unit: "" });
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
