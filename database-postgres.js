import { randomUUID } from "node:crypto";

import { pool } from "./plugins/db.js";

export class DatabasePostgres{
  async list(search) {

    if(search){
      const { rows } = await pool.query("SELECT * FROM videos WHERE title ILIKE $1", [`%${search}%`]);
      return { status: "ok", data: rows };
    }else{
      const { rows } = await pool.query("SELECT * FROM videos");
      return { status: "ok", data: rows };
    }
  }
  async create(video) {
    const {title, description, duration} = video;

    const sql = `INSERT INTO videos (title, description, duration) VALUES ($1,$2,$3)`;
    await pool.query(sql, [title, description, duration]);
  }
  async update(id, video) {
    const {title, description, duration} = video;

    const sql = `UPDATE videos SET title=$1, description=$2, duration=$3 WHERE id=$4`;
    await pool.query(sql, [title, description, duration, id]);
  }
  async delete(id) {
    const sql = `DELETE FROM videos WHERE id=$1`;
    await pool.query(sql, [ id]);
  }
}