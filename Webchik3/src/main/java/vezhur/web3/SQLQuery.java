package vezhur.web3;

public enum SQLQuery {

    INSERT_SHOT("INSERT INTO shots "
            + "(x, y, r, id, date, time, result) "
            + "VALUES(?, ?, ?, ?, ?, ?, ?)"),

    SELECT_ALL_SHOTS("SELECT x, y, r, id, date, time, result "
            + "FROM shots");

    private final String query;

    SQLQuery(String query) {
        this.query = query;
    }

    public String getQuery() {
        return query;
    }
}
