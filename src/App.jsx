import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

function App() {
  const [star, setStar] = useState(0);
  const [feedback, setFeedback] = useState({});
  const [listFeedback, setListFeedback] = useState([]);

  const handleStar = (star) => {
    setStar(star);
    setFeedback((prev) => ({ ...prev, star }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.name || !feedback.phone || !feedback.email || !feedback.feedback) {
      alert("Please fill in all fields!");
      return;
    }

    const newFeedbackList = [...listFeedback, feedback];
    setListFeedback(newFeedbackList);
    sessionStorage.setItem("feedbackList", JSON.stringify(newFeedbackList));

    setStar(0);
    setFeedback({});
  };

  // Load feedback from sessionStorage when the component mounts
  useEffect(() => {
    const storedFeedback = sessionStorage.getItem("feedbackList");
    if (storedFeedback) {
      setListFeedback(JSON.parse(storedFeedback));
    }
  }, []);

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", padding: "20px", backgroundColor: "#f4f4f9" }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>Feedback</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", backgroundColor: "white" }}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            value={feedback.name || ""}
            style={{ margin: "5px", padding: "10px", width: "250px", border: "1px solid #ccc", borderRadius: "5px" }}
            required
          />
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            onChange={handleChange}
            value={feedback.phone || ""}
            style={{ margin: "5px", padding: "10px", width: "250px", border: "1px solid #ccc", borderRadius: "5px" }}
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            value={feedback.email || ""}
            style={{ margin: "5px", padding: "10px", width: "250px", border: "1px solid #ccc", borderRadius: "5px" }}
            required
          />
        </div>

        <div style={{ margin: "10px 0" }}>
          {[1, 2, 3, 4, 5].map((v) => (
            <FaStar
              key={v}
              color={star >= v ? "yellow" : "gray"}
              onMouseOver={() => handleStar(v)}
              style={{ margin: "0 5px", fontSize: "24px" }}
            />
          ))}
        </div>

        <div>
          <textarea
            name="feedback"
            placeholder="Your Feedback"
            onChange={handleChange}
            value={feedback.feedback || ""}
            style={{ margin: "10px 0", padding: "10px", width: "300px", height: "100px", border: "1px solid #ccc", borderRadius: "5px" }}
            required
          ></textarea>
        </div>

        <input type="submit" value="Add Feedback" style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", fontSize: "16px" }} />
      </form>

      <table align="center" border={1} style={{ width: "80%", margin: "0 auto", borderCollapse: "collapse", backgroundColor: "white", borderRadius: "5px", overflow: "hidden" }}>
        <thead style={{ backgroundColor: "#007bff", color: "white" }}>
          <tr>
            <th style={{ padding: "10px" }}>Star</th>
            <th style={{ padding: "10px" }}>Name</th>
            <th style={{ padding: "10px" }}>Phone</th>
            <th style={{ padding: "10px" }}>Email</th>
            <th style={{ padding: "10px" }}>Message</th>
          </tr>
        </thead>
        <tbody>
          {listFeedback.map((val, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#f9f9f9" : "white" }}>
              <td style={{ padding: "10px" }}>
                {[1, 2, 3, 4, 5].map((v) => (
                  <FaStar key={v} color={val.star >= v ? "yellow" : "gray"} />
                ))}
              </td>
              <td style={{ padding: "10px" }}>{val.name}</td>
              <td style={{ padding: "10px" }}>{val.phone}</td>
              <td style={{ padding: "10px" }}>{val.email}</td>
              <td style={{ padding: "10px" }}>{val.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
