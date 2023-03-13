package vezhur.web3;

import jakarta.enterprise.context.SessionScoped;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "SHOT_HISTORY")
@SessionScoped
public class Shot implements Serializable {

    @Id
    @Column(name = "id", nullable = false)
    long id;
    String date;
    int time;
    float x;
    float y;
    float r;
    boolean result;

    protected Shot() {
        this.date = Clock.formatter.format(new Date());
        this.time = 0;
        this.x = 0;
        this.y = 0;
        this.r = 2;
        this.result = false;
    }

    public Shot(float x, float y, float r, String date, int time, boolean result) {
        this.date = date;
        this.time = time;
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
    }

    public Shot(float x, float y, float r, String date, int time, boolean result, long id) {
        this.date = date;
        this.time = time;
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
        this.id = id;
    }

    public long getId() {
        return id;
    }

    protected void setId(long id) {
        this.id = id;
    }

    @Column(name = "EVENT_DATE")
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Column(name = "EVENT_TIME")
    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public float getR() {
        return r;
    }

    public void setR(float r) {
        this.r = r;
    }

    public void setR1() {
        r = 1;
    }
    public void setR2() {
        r = 2;
    }
    public void setR3() {
        r = 3;
    }
    public void setR4() {
        r = 4;
    }
    public void setR5() {
        r = 5;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }
}
