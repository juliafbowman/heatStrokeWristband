# Heat Stroke Wristband 

---

# 📘 Abstract  
A wearable heat-stroke prevention bracelet designed for elderly individuals. 

The device uses two Bluetooth-linked Fire Beetle BTE 4.1 boards paired with Arduino to collect sensor data and relay real-time information to a custom user interface.  

The system reads:
- Heart rate  
- Ambient temperature  
- Humidity  
- Ultraviolet (UV) exposure  

The hardware setup integrates three I²C sensors:
- **LTR390 UV sensor**  
- **SparkFun Pulse Oximeter & Heart Rate Monitor**  
- **DHT11 Temperature & Humidity sensor**

The UI displays live sensor data, including heart rate graphs, temperature and humidity readings, UV index monitoring, and activity intensity visualization.

---

# I. Introduction
Heat stroke is a dangerous and sometimes fatal condition caused by prolonged exposure to high temperatures. In the U.S. alone, it contributes to over 700 deaths annually. High UV exposure and humidity increase risks—especially for vulnerable populations such as the elderly.

Wearable technologies offer a modern solution by enabling real-time environmental and physiological monitoring. This project introduces a wristband capable of tracking heart rate, UV exposure, temperature, and humidity to provide early warnings of dangerous heat conditions.

By integrating multiple sensors with a responsive UI, this project demonstrates how wearable technology can enhance personal health safety, particularly in increasingly uncertain environmental conditions.

---

# II. Setup

## A. Bluetooth Configuration (Fire Beetle Boards)
1. Connect a Fire Beetle board (with soldered headers) to a computer using a micro-USB cable.  
2. In Arduino IDE, select:  
   - **Board:** Arduino Pro or Pro Mini  
   - **Processor:** ATmega328P (3.3V, 8MHz)  
3. Open the Serial Monitor:  
   - Set to **"No line ending"** + **115200 baud**  
4. Enter `+++` to access AT mode.  
5. Switch to **Both NL & CR** and enter:  
   - `AT+ROLE=ROLE_PERIPHERAL`  
   - `AT+MAC=?` → Save the MAC address  
   - `AT+CMODE=UNIQUE`  

Repeat the process for the second board, configuring it as:  
- **ROLE_CENTRAL**  
- Bind MAC addresses using `AT+BIND=<address>`  

When both boards flash a yellow LED periodically, they are successfully linked.

---

## B. Hardware
Components used:
- SparkFun Pulse Oximeter & Heart Rate Monitor  
- LTR390 UV Sensor  
- DHT11 Temperature & Humidity Sensor  
- Five LEDs with protective resistors  

The heart rate monitor and UV sensor communicate via I²C, requiring connections to SDA/SCL pins on the Fire Beetle board.

---

## C. Arduino Code
The Arduino code manages:
- Heart rate monitoring via SparkFun Bio Sensor Hub Library  
- UV detection via Adafruit LTR390 library  
- Temperature & humidity monitoring via DHT11  

### **Setup Process**
1. Start serial communication at **115200 baud**  
2. Initialize the heart rate sensor with `bioHub.begin()` and configure BPM mode  
3. Initialize the UV sensor with:  
   - `ltr.begin()`  
   - `ltr.setMode(LTR390_MODE_UVS)`  
   - Gain & resolution adjustments  
4. Configure UV thresholds for alerts  

### **Loop Behavior**
- Continuously reads heart rate via `bioHub.readBpm()`  
- Monitors UV exposure using `ltr.readUVS()`  
- Prints real-time data to Serial Monitor  
- Includes error handling for sensor failures  

This organization ensures smooth data collection and efficient sensor performance.

---

# III. User Interface (Design)
The team used **Figma** to prototype the user interface before implementation. Figma offered:

- Organized collaborative design  
- Clear layout of all UI components  
- Mockups of sensor displays, graphs, and buttons  
- Margin notes for team communication  
- A unified team vision and reduced miscommunication  

The prototype served as a blueprint for the final UI, ensuring feature alignment and helping predict design and development issues early.

---

# IV. User Interface (Coding)
The UI aims to provide a seamless, responsive, and intuitive real-time monitoring experience.

## **Technologies Used**
### **Frontend**
- **React.js** (dynamic updates, component structure)  
- **CSS** (responsive layout, modern styling)  
- **Axios** (data fetching from backend)  
- **React Router** (page navigation)

### **Backend**
Two Node.js/Express servers:
1. **Weather API Server** – fetches data from OpenWeather  
2. **Arduino Data Server** – reads serial sensor input from Fire Beetle  
   - Uses the `SerialPort` library  
   - Parses data and exposes it as JSON  
   - Utilizes CORS for cross-origin access  

### **Sensor Integration**
- Heart rate, UV, temperature, humidity sent via serial → backend  
- Backend forwards processed data as JSON → React UI  
- Real-time charts and safety indicators update React state  

### **Challenges**
- Ensuring real-time updates (solved with polling)  
- Managing CORS  
- Handling delays in sensor input  
- Synchronizing UI updates  

### **Future Improvements**
- Add WebSockets for live streaming  
- Add historical data graphs  
- Expand to native mobile apps  

---

# V. Conclusion
This project demonstrates how wearable health technology can play a critical role in preventing heat-related illnesses. By integrating multiple sensors, Bluetooth communication, and a responsive user interface, the wristband provides real-time data for personal safety.

The project highlights the importance of sensor accuracy, intuitive UX design, and reliable signal processing, laying the foundation for future enhancements such as advanced analytics, mobile integration, and broader applications in environmental health monitoring.