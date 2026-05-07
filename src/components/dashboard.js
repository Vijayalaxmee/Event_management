import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  // FETCH EVENTS FROM BACKEND
  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/events"
      );

      // FILTER EMPTY EVENTS
      const filtered = res.data.filter(
        (event) =>
          event.name &&
          event.description &&
          event.location
      );

      setEvents(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  // BOOK EVENT
  const handleBook = (event) => {
    setSelectedEvent(event);
    setShowBooking(true);
    setBookingSuccess(false);
  };

  // CONFIRM BOOKING
  const confirmBooking = () => {
    setBookingSuccess(true);

    setTimeout(() => {
      setShowBooking(false);
    }, 2500);
  };

  // CONTACT
  const handleContact = (event) => {
    setSelectedEvent(event);
    setShowContact(true);
  };

  // EVENT IMAGES
  const getImage = (eventType) => {
    switch (eventType?.toLowerCase()) {
      case "concert":
        return "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200";

      case "conference":
        return "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200";

      case "food festival":
        return "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200";

      case "exhibition":
        return "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200";

      case "tech expo":
        return "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200";

      case "workshop":
        return "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200";

      default:
        return "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200";
    }
  };

  return (
    <div style={styles.page}>
      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.overlay}>
          <h1 style={styles.logo}>EventHub</h1>

          <h2 style={styles.heroTitle}>
            Discover Amazing Events Near You
          </h2>

          <p style={styles.heroText}>
            Concerts • Conferences • Festivals • Exhibitions
          </p>

          <button style={styles.heroBtn}>
            Explore Events
          </button>
        </div>
      </div>

      {/* EVENTS */}
      <div style={styles.section}>
        <h2 style={styles.heading}>
          Popular Events
        </h2>

        <div style={styles.grid}>
          {events.map((event) => (
            <div
              key={event.eventId}
              style={styles.card}
            >
              {/* IMAGE */}
              <div style={styles.imageBox}>
                <img
                  src={getImage(event.eventType)}
                  alt={event.name}
                  style={styles.image}
                />

                <div style={styles.type}>
                  {event.eventType}
                </div>
              </div>

              {/* CONTENT */}
              <div style={styles.content}>
                <h3 style={styles.title}>
                  {event.name}
                </h3>

                <p style={styles.desc}>
                  {event.description}
                </p>

                <div style={styles.infoBox}>
                  <p style={styles.info}>
                    📍 {event.location}
                  </p>

                  <p style={styles.info}>
                    📅 {event.date}
                  </p>

                  <p style={styles.info}>
                    ⏰ {event.time}
                  </p>

                  <p style={styles.info}>
                    👥 Capacity:{" "}
                    {event.capacity || 500}
                  </p>
                </div>

                {/* FOOTER */}
                <div style={styles.footer}>
                  <span style={styles.status}>
                    {event.status}
                  </span>

                  <div style={styles.btns}>
                    <button
                      style={styles.bookBtn}
                      onClick={() =>
                        handleBook(event)
                      }
                    >
                      Book Event
                    </button>

                    <button
                      style={styles.contactBtn}
                      onClick={() =>
                        handleContact(event)
                      }
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOOKING MODAL */}
      {showBooking && selectedEvent && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            {!bookingSuccess ? (
              <>
                <h2 style={styles.modalTitle}>
                  🎟 Confirm Booking
                </h2>

                <img
                  src={getImage(
                    selectedEvent.eventType
                  )}
                  alt=""
                  style={styles.modalImage}
                />

                <h3>{selectedEvent.name}</h3>

                <p>
                  📍 {selectedEvent.location}
                </p>

                <p>
                  📅 {selectedEvent.date}
                </p>

                <button
                  style={styles.confirmBtn}
                  onClick={confirmBooking}
                >
                  Confirm Booking
                </button>

                <button
                  style={styles.closeBtn}
                  onClick={() =>
                    setShowBooking(false)
                  }
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div style={styles.successIcon}>
                  ✓
                </div>

                <h2>
                  Booking Successful!
                </h2>

                <p>
                  Your seat has been reserved for{" "}
                  <b>
                    {selectedEvent.name}
                  </b>
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* CONTACT MODAL */}
      {showContact && selectedEvent && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>
              📞 Organizer Details
            </h2>

            <img
              src={getImage(
                selectedEvent.eventType
              )}
              alt=""
              style={styles.modalImage}
            />

            <h3>{selectedEvent.name}</h3>

            <div style={styles.contactBox}>
              <p>
                👤 Organizer:
                <br />
                <b>
                  {selectedEvent.organizerName ||
                    "Event Team"}
                </b>
              </p>

              <p>
                📱 Phone:
                <br />
                <b>
                  {selectedEvent.organizerContact ||
                    "+91 9876543210"}
                </b>
              </p>

              <p>
                ✉ Email:
                <br />
                <b>
                  support@eventhub.com
                </b>
              </p>
            </div>

            <button
              style={styles.closeBtn}
              onClick={() =>
                setShowContact(false)
              }
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={styles.footerSection}>
        <h2>EventHub</h2>

        <p>
          Find and book the best events
          near you.
        </p>

        <p>Email: support@eventhub.com</p>

        <p>Phone: +91 9876543210</p>
      </div>
    </div>
  );
}

// STYLES
const styles = {
  page: {
    background: "#f4f7fb",
    minHeight: "100vh",
    fontFamily: "Arial"
  },

  hero: {
    height: "85vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1600')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },

  overlay: {
    background:
      "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75))",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "white",
    padding: "20px"
  },

  logo: {
    fontSize: "70px",
    fontWeight: "bold"
  },

  heroTitle: {
    fontSize: "52px",
    marginTop: "20px"
  },

  heroText: {
    fontSize: "20px",
    marginTop: "10px",
    color: "#ddd"
  },

  heroBtn: {
    marginTop: "30px",
    padding: "15px 35px",
    border: "none",
    borderRadius: "40px",
    background:
      "linear-gradient(135deg,#667eea,#764ba2)",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer"
  },

  section: {
    padding: "70px 50px"
  },

  heading: {
    textAlign: "center",
    fontSize: "42px",
    marginBottom: "50px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "35px"
  },

  card: {
    background: "white",
    borderRadius: "22px",
    overflow: "hidden",
    boxShadow:
      "0 12px 30px rgba(0,0,0,0.08)"
  },

  imageBox: {
    position: "relative"
  },

  image: {
    width: "100%",
    height: "240px",
    objectFit: "cover"
  },

  type: {
    position: "absolute",
    top: "18px",
    left: "18px",
    background:
      "linear-gradient(135deg,#ff512f,#dd2476)",
    color: "white",
    padding: "8px 18px",
    borderRadius: "30px",
    fontWeight: "bold"
  },

  content: {
    padding: "25px"
  },

  title: {
    fontSize: "28px",
    marginBottom: "10px"
  },

  desc: {
    color: "#666",
    marginBottom: "20px",
    lineHeight: "1.6"
  },

  infoBox: {
    background: "#f8f9fd",
    padding: "15px",
    borderRadius: "14px",
    marginBottom: "20px"
  },

  info: {
    margin: "8px 0"
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  status: {
    background: "#28c76f",
    color: "white",
    padding: "8px 16px",
    borderRadius: "30px",
    fontWeight: "bold"
  },

  btns: {
    display: "flex",
    gap: "10px"
  },

  bookBtn: {
    padding: "11px 18px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg,#667eea,#764ba2)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  contactBtn: {
    padding: "11px 18px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg,#00b09b,#96c93d)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  footerSection: {
    background: "#111",
    color: "white",
    textAlign: "center",
    padding: "40px 20px",
    marginTop: "60px"
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },

  modal: {
    background: "white",
    borderRadius: "20px",
    padding: "30px",
    width: "400px",
    textAlign: "center"
  },

  modalTitle: {
    marginBottom: "20px"
  },

  modalImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "14px",
    marginBottom: "15px"
  },

  confirmBtn: {
    marginTop: "20px",
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg,#667eea,#764ba2)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  closeBtn: {
    marginTop: "12px",
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#eee",
    cursor: "pointer"
  },

  successIcon: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "#28c76f",
    color: "white",
    fontSize: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 20px"
  },

  contactBox: {
    textAlign: "left",
    background: "#f8f9fd",
    padding: "20px",
    borderRadius: "12px",
    marginTop: "20px"
  }
};