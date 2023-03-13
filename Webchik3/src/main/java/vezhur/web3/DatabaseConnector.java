package vezhur.web3;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnector {
    private static final String HOST = "127.0.0.1";
    private static final String DATABASE_NAME = "web3";
    private static final String USER = "postgres";
    private static final String PASSWORD = "12345";
    private static final String URL = "jdbc:postgresql://" + HOST + ":5432/" + DATABASE_NAME;

    public static Connection connect() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
