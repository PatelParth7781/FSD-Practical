import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [museums, setMuseums] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    image: "",
    year: ""
  });
  const [error, setError] = useState("");

  const fetchMuseums = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/museums");

      if (!response.ok) {
        throw new Error("Failed to fetch museums");
      }

      const data = await response.json();
      setMuseums(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchMuseums();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.category || !form.description || !form.year) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/museums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          year: Number(form.year)
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create museum");
      }

      setForm({
        name: "",
        category: "",
        description: "",
        image: "",
        year: ""
      });

      fetchMuseums();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Museum Collection</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Museum Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />

        <input
          name="year"
          type="number"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
        />

        <button type="submit">Add Museum</button>
      </form>

      {error && <p className="error">{error}</p>}

      <h2>Museum Items</h2>

      {museums.map((museum) => (
        <div className="card" key={museum._id}>
          <h3>
            {museum.name} ({museum.year})
          </h3>

          <p>Category: {museum.category}</p>
          <p>{museum.description}</p>

          {museum.image && <p>Image: {museum.image}</p>}
        </div>
      ))}
    </div>
  );
}

export default App;