package vezhur.web3;

import java.time.Instant;
import java.util.Date;

public class HitHandler {
    public static Shot process(float x, float y, float r) {
        Instant time = Instant.now();
        String date = Clock.formatter.format(new Date());
        boolean result = checkFirstQuarter(x, y, r) || checkThirdQuarter(x, y, r) || checkFourthQuarter(x, y, r);
        return new Shot(x, y, r, date, (Instant.now().getNano() - time.getNano()) / 1000, result);
    }

    private static boolean checkFirstQuarter(double x, double y, double r) {
        return (x >= 0 && y >= 0) && (x + y <= r/2);
    }

    private static boolean checkThirdQuarter(double x, double y, double r) {
        return (x <= 0 && y <= 0) && (x >= -r && y >= -r/2);
    }

    private static boolean checkFourthQuarter(double x, double y, double r) {
        return (x >= 0 && y <= 0) && (x*x + y*y <= r*r/4);
    }
}
