const Database = require("./config");

const initDb = {
  async init() {
    // Declarar a função Database
    const db = await Database();

    // Cria a tabela profile
    await db.exec(`CREATE TABLE profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        monthly_budget INT,
        days_per_week INT,
        hours_per_day INT,
        vacation_per_year INT,
        value_hour INT
        )`);

    // Cria a tabela jobs
    await db.exec(`CREATE TABLE jobs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        daily_hours INT,
        total_hours INT,
        created_at DATETIME
      )`);

    // Executa a tabela profile
    await db.run(`INSERT INTO profile(
        name,
        avatar,
        monthly_budget,
        days_per_week,
        hours_per_day,
        vacation_per_year,
        value_hour
        ) VALUES (
          'Gabriel',
          'https://avatars.githubusercontent.com/u/59969985?v=4',
          3000,
          5,
          5,
          4,
          70
          );`);

    // Executa a tabela jobs
    await db.run(`INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        created_at
        ) VALUES (
          "Force Burguer",
          2,
          1,
          1617514376018
          );`);

    // Executa a tabela jobs
    await db.run(`INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        created_at
      ) VALUES (
        "Island Pizza",
        3,
        47,
        1617514376018
      );`);

    // Fecha a conexão com o banco de dados
    await db.close();
  },
};

initDb.init();
