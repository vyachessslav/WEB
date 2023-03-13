package com.vezhur.web_lab4.service;

import com.vezhur.web_lab4.dto.Coordinates;
import org.springframework.stereotype.Component;

@Component
public class HitCheckerImpl implements HitChecker {

    @Override
    public boolean checkHit(Coordinates coordinates) {
        return checkFirstQuarter(coordinates.getX(), coordinates.getY(), coordinates.getR()) ||
                checkThirdQuarter(coordinates.getX(), coordinates.getY(), coordinates.getR()) ||
                checkFourthQuarter(coordinates.getX(), coordinates.getY(), coordinates.getR());
    }

    private static boolean checkFirstQuarter(double x, double y, double r) {
        return (x >= 0 && y >= 0) && (x <= r/2 && y <= r);
    }

    private static boolean checkThirdQuarter(double x, double y, double r) {
        return (x <= 0 && y <= 0) && (x + y >= -r);
    }

    private static boolean checkFourthQuarter(double x, double y, double r) {
        return (x >= 0 && y <= 0) && (x*x + y*y <= r*r);
    }
}
