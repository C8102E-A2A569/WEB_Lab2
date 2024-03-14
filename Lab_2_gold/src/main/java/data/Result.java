package data;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

public record Result(int x, double y, double r, boolean isHit, String currTime, Long execTime) {

    public static Result validateAndCreate(String rawX, String rawY, String rawR) throws NumberFormatException {
        if (rawX == null || rawY == null || rawR == null) {
            throw new NumberFormatException("Coords values must be not null");
        }
        int x = Integer.parseInt(rawX);
        double y = Double.parseDouble(rawY);
        double r = Double.parseDouble(rawR);
        boolean isHit = isInArea(x, y, r);

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Calendar calendar = Calendar.getInstance();
        String currTime = dateFormat.format(calendar.getTime());

        Long execTime = System.currentTimeMillis();

        return new Result(x, y, r, isHit, currTime, execTime);
    }


    public static boolean isInArea(int x, double y, double r) {
        // Circle of radius R
        if (x <= 0 && y <= 0) {
            return (x * x + y * y) <= r * r;
        }
        // Triangle
        if (x >= 0 && y >= 0) {
            return (x <= r) && (y <= r) && (y + x <= r);
        }
        // Rectangle
        if (x <= 0 && y >= 0) {
            return (x >= -r*1.8) && (y <= r);
        }
        // Upper right corner with nothing in it
        return false;
    }
    private boolean validateX (int x) {
//        int x =  Integer.parseInt(xVal);
        List<Integer> validXValues = Arrays.asList(-5, -4, -3, -2, -1, 0, 1, 2, 3);
        return validXValues.contains(x);
//            return true;
    }

    private boolean validateY (double y) {
//        double y = Double.parseDouble(yVal);
//            return true;
        return y > -3 && y < 3;
    }
    private boolean validateR (double r) {
//        double r = Double.parseDouble(rVal);
//            return true;
        return r > 2 && r < 5;
    }

    public boolean isValid(){

        return validateX(getX()) && validateY(getY()) && validateR(getR());
    }


    public int getX(){
        return x;
    }
    public double getY(){
        return y;
    }
    public double getR(){
        return r;
    }
    public String getCurrTime() {
        return currTime;
    }
    public Long getExecTime() {
        return execTime;
    }


}