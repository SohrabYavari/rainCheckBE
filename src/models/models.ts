import db from "../server/connection";

export async function fetchUsers() {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function fetchSpecificEvent(event_id: number) {
  try {
    const [rows] = await db.query("SELECT * FROM events WHERE event_id = ?", [
      event_id,
    ]);
    return rows;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

export async function fetchEventByUser(created_by: string) {
  try {
    const [rows] = await db.query("SELECT * FROM events WHERE created_by = ?", [
      created_by,
    ]);
    return rows;
  } catch (error) {
    console.error("Error fetching users events");
    throw error
  }
}

export async function fetchEvents() {
  try {
    const [rows] = await db.query("SELECT * FROM events");
    return rows;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

export async function inviteeFlaked(event_id: number) {
  try {
    const flaked = await db.query(
      `UPDATE events SET invitee_flaked = 1 WHERE event_id = ?`,
      [event_id]
    );
    return flaked;
  } catch (error) {
    console.error("Error patching event details", error);
    throw error;
  }
}

export async function hostFlaked(event_id: number) {
  try {
    const flaked = await db.query(
      `UPDATE events SET host_flaked = 1 WHERE event_id = ?`,
      [event_id]
    );
    return flaked;
  } catch (error) {
    console.error("Error patching event details");
    throw error
  }
}

export async function addEvent(
  
  title: string,
  description: string,
  date: string,
  location: string,
  created_by: string,
  invited: string,
  host_flaked: number,
  invitee_flaked: number
) {
  try {
    const [result] = await db.execute(
      `
    INSERT INTO events (
      title, 
      description, 
      date, 
      location, 
      created_by, 
      invited, 
      host_flaked, 
      invitee_flaked
      )
      VALUES(?,?,?,?,?,?,?,?)
    `,
      [
        title,
        description,
        date,
        location,
        created_by,
        invited,
        host_flaked,
        invitee_flaked,
      ]
    );

    const insertId = (result as any).insertId
    
    const[rows] = await db.query('SELECT * FROM events WHERE event_id = ?', [insertId]);
    return rows[0];
  } catch (error) {
    console.error("Error creating event", error);
    throw error 
  }
}
