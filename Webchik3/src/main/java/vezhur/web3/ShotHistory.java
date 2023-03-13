package vezhur.web3;

import jakarta.el.ELContext;
import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Named;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Named
@SessionScoped
public class ShotHistory implements Serializable {

    public void processAndAddShot() throws SQLException {
        ELContext elContext = FacesContext.getCurrentInstance().getELContext();
        Coordinates coordinates = (Coordinates) FacesContext.getCurrentInstance().getApplication().getELResolver().
                getValue(elContext, null, "coordinates");
        Shot shot = HitHandler.process(coordinates.getX(), coordinates.getY(), coordinates.getR());
        Connection connection = DatabaseConnector.connect();
        PreparedStatement addShotToTable = connection.prepareStatement(SQLQuery.INSERT_SHOT.getQuery());
        int paramCounter = 1;
        addShotToTable.setFloat(paramCounter++, shot.getX());
        addShotToTable.setFloat(paramCounter++, shot.getY());
        addShotToTable.setFloat(paramCounter++, shot.getR());
        addShotToTable.setFloat(paramCounter++, shot.getId());
        addShotToTable.setString(paramCounter++, shot.getDate());
        addShotToTable.setInt(paramCounter++, shot.getTime());
        addShotToTable.setBoolean(paramCounter, shot.isResult());
        try {
            addShotToTable.executeQuery();
        }
        catch(SQLException ignored) {}
    }

    public List<Shot> getHistory() throws SQLException {
        List<Shot> history = new ArrayList<>();
        Connection connection = DatabaseConnector.connect();
        PreparedStatement selectAllShots = connection.prepareStatement(SQLQuery.SELECT_ALL_SHOTS.getQuery());
        ResultSet resultSet = selectAllShots.executeQuery();
        while (resultSet.next()) {
            Shot shot = new Shot(
                    resultSet.getFloat("x"),
                    resultSet.getFloat("y"),
                    resultSet.getFloat("r"),
                    resultSet.getString("date"),
                    resultSet.getInt("time"),
                    resultSet.getBoolean("result"),
                    resultSet.getInt("id")
            );
            history.add(shot);
        }
        return history;
    }
}
