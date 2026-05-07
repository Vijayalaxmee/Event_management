import React, { useEffect, useState } from "react";
import api from "../Services/api";

export default function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>🎉 EventHub</h2>

        <div>
          <span style={styles.navItem}>Home</span>
          <span style={styles.navItem}>Events</span>
          <span style={styles.navItem}>Venues</span>
          <span style={styles.navItem}>Organizers</span>
          <span style={styles.navItem}>Contact</span>
        </div>

        <button style={styles.navBtn}>Book Now</button>
      </nav>

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.overlay}>
          <h1 style={styles.heroTitle}>
            Discover Amazing Events Near You
          </h1>

          <p style={styles.heroText}>
            Conferences • Concerts • Weddings • Workshops • Tech Events
          </p>

          <div style={styles.searchBox}>
            <input style={styles.input} placeholder="📍 Location" />
            <input style={styles.input} placeholder="🎫 Event Type" />
            <input style={styles.input} type="date" />

            <button style={styles.searchBtn}>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* SECTION TITLE */}
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>🔥 Trending Events</h2>
        <p style={styles.sectionSub}>
          Explore the latest and most popular events
        </p>
      </div>

      {/* EVENT CARDS */}
      <div style={styles.grid}>
        {events.map((event) => (
          <div key={event.eventId} style={styles.card}>

            <img
              src={
                event.imageUrl ||
                "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
              }
              alt="event"
              style={styles.image}
            />

            <div style={styles.cardContent}>

              <div style={styles.badge}>
                {event.eventType || "EVENT"}
              </div>

              <h3 style={styles.cardTitle}>
                {event.name}
              </h3>

              <p style={styles.desc}>
                {event.description}
              </p>

              <div style={styles.infoBox}>
                <p>📍 {event.location}</p>
                <p>📅 {event.date}</p>
                <p>⏰ {event.time}</p>
                <p>👤 {event.organizerName}</p>
              </div>

              <button style={styles.detailsBtn}>
                View Details
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <h3>EventHub</h3>
        <p>
          Your one-stop destination for discovering and booking events.
        </p>
      </footer>

    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#f4f7fb",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif"
  },

  navbar: {
    height: "75px",
    background: "#111827",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 40px",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },

  logo: {
    color: "#fff",
    fontSize: "28px"
  },

  navItem: {
    color: "#fff",
    margin: "0 12px",
    cursor: "pointer",
    fontSize: "16px"
  },

  navBtn: {
    background: "#2563eb",
    border: "none",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  hero: {
    height: "85vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1505373877841-8d25f7d46678')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: "50px",
    borderRadius: "20px",
    textAlign: "center",
    width: "80%"
  },

  heroTitle: {
    color: "#fff",
    fontSize: "55px",
    marginBottom: "20px"
  },

  heroText: {
    color: "#ddd",
    fontSize: "20px",
    marginBottom: "35px"
  },

  searchBox: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap"
  },

  input: {
    padding: "14px",
    width: "240px",
    borderRadius: "10px",
    border: "none",
    fontSize: "15px"
  },

  searchBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "14px 28px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px"
  },

  sectionHeader: {
    textAlign: "center",
    marginTop: "50px"
  },

  sectionTitle: {
    fontSize: "38px",
    color: "#111827"
  },

  sectionSub: {
    color: "#666",
    marginTop: "10px"
  },

  grid: {
    padding: "40px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
    gap: "30px"
  },

  card: {
    background: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    transition: "0.3s"
  },

  image: {
    width: "100%",
    height: "240px",
    objectFit: "cover"
  },

  cardContent: {
    padding: "22px"
  },

  badge: {
    background: "#2563eb",
    color: "#fff",
    padding: "6px 12px",
    display: "inline-block",
    borderRadius: "30px",
    fontSize: "12px",
    marginBottom: "12px"
  },

  cardTitle: {
    fontSize: "24px",
    marginBottom: "12px",
    color: "#111827"
  },

  desc: {
    color: "#666",
    marginBottom: "15px",
    minHeight: "60px"
  },

  infoBox: {
    lineHeight: "1.8",
    color: "#333",
    marginBottom: "20px"
  },

  detailsBtn: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#111827",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px"
  },

  footer: {
    marginTop: "50px",
    background: "#111827",
    color: "#fff",
    textAlign: "center",
    padding: "30px"
  }
};