/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

/**
 * Motor directions
 */
enum lnwMotor {
    //% block="Forward"
    Forward,
    //% block="Backward"
    Backward
}

/**
 * Turn directions
 */
enum lnwTurn {
    //% block="Left"
    Left,
    //% block="Right"
    Right
}

/**
 * Spin directions
 */
enum lnwSpin {
    //% block="Left"
    Left,
    //% block="Right"
    Right
}

/**
 * Servo channels
 */
enum lnwServo {
    //% block="SV1 (P9)"
    SV1,
    //% block="SV2 (P10)"
    SV2,
    //% block="SV3 (P11)"
    SV3,
    //% block="SV4 (P12)"
    SV4
}


/**
 * ADC channels
 */
enum lnwReadADC {
    //% block="ADC0"
    ADC0 = 0,
    //% block="ADC1"
    ADC1 = 1,
    //% block="ADC2"
    ADC2 = 2,
    //% block="ADC3"
    ADC3 = 3,
    //% block="ADC4"
    ADC4 = 4,
    //% block="ADC5"
    ADC5 = 5,
    //% block="ADC6"
    ADC6 = 6,
    //% block="ADC7"
    ADC7 = 7
}

/**
 * Motor channel
 */
enum lnwMotorCH {
    //% block="M1"
    M1,
    //% block="M2"
    M2
}
/**
 * Digital pins for P0-P12
 */
enum lnwDigitalPin {
    //% block="P0"
    P0 = DigitalPin.P0,
    //% block="P1"
    P1 = DigitalPin.P1,
    //% block="P2"
    P2 = DigitalPin.P2,
    //% block="P3"
    P3 = DigitalPin.P3,
    //% block="P4"
    P4 = DigitalPin.P4,
    //% block="P5"
    P5 = DigitalPin.P5,
    //% block="P6"
    P6 = DigitalPin.P6,
    //% block="P7"
    P7 = DigitalPin.P7,
    //% block="P8"
    P8 = DigitalPin.P8,
    //% block="P9"
    P9 = DigitalPin.P9,
    //% block="P10"
    P10 = DigitalPin.P10,
    //% block="P11"
    P11 = DigitalPin.P11,
    //% block="P12"
    P12 = DigitalPin.P12
}
/**
 * Analog pins P0 - P12
 */
enum lnwAnalogPin {
    //% block="P0"
    P0 = AnalogPin.P0,
    //% block="P1"
    P1 = AnalogPin.P1,
    //% block="P2"
    P2 = AnalogPin.P2,
    //% block="P3"
    P3 = AnalogPin.P3,
    //% block="P4"
    P4 = AnalogPin.P4,
    //% block="P5"
    P5 = AnalogPin.P5,
    //% block="P6"
    P6 = AnalogPin.P6,
    //% block="P7"
    P7 = AnalogPin.P7,
    //% block="P8"
    P8 = AnalogPin.P8
}

/**
 * Analog write P0 - P8
 */
//% blockNamespace="Analog Write"
//% weight=60
enum lnwAnalogWrite {
    //% block="P0"
    P0,
    //% block="P1"
    P1,
    //% block="P2"
    P2,
    //% block="P3"
    P3,
    //% block="P4"
    P4,
    //% block="P5"
    P5,
    //% block="P6"
    P6,
    //% block="P7"
    P7,
    //% block="P8"
    P8
}


/**
* Custom motor control blocks for lnw
*/
//% block="lnw" weight=100 color=#FFA500 icon="\uf085"
namespace lnw {

    /**
     * Control motor with analog style (-1023 to 1023)
     * M1 = P13, P14
     * M2 = P15, P16
     * @param Channel Motor channel
     * @param Speed Speed (-1023 to 1023), eg: 800
     */
    //% blockId="lnw_setMotor" block="setMotor %Channel|Speed %Speed"
    //% Speed.min=-1023 Speed.max=1023
    //% weight=100
    //% group="Motor"
    export function setMotor(Channel: lnwMotorCH, Speed: number): void {
        if (Channel == lnwMotorCH.M1) {
            if (Speed >= 0) {
                pins.analogWritePin(AnalogPin.P14, Speed)
                pins.analogWritePin(AnalogPin.P13, 0)
            } else {
                pins.analogWritePin(AnalogPin.P14, 0)
                pins.analogWritePin(AnalogPin.P13, -Speed)
            }
        }
        else if (Channel == lnwMotorCH.M2) {
            if (Speed >= 0) {
                pins.analogWritePin(AnalogPin.P16, Speed)
                pins.analogWritePin(AnalogPin.P15, 0)
            } else {
                pins.analogWritePin(AnalogPin.P16, 0)
                pins.analogWritePin(AnalogPin.P15, -Speed)
            }
        }
    }

    /**
     * Turn the robot by running one motor.
     * @param Turn Direction to turn, eg: cpeTurn.Left
     * @param speed Speed (0 to 1023), eg: 512
     */
    //% blockId="lnw_turn" block="Turn %Turn|Speed %speed"
    //% speed.min=0 speed.max=1023
    //% group="Motor"
    export function Turn(Turn: lnwTurn, speed: number): void {
        if (Turn == lnwTurn.Left) {
            setMotor(lnwMotorCH.M1, 0)     // M1 หยุด
            setMotor(lnwMotorCH.M2, speed) // M2 หมุนไปข้างหน้า
        } else if (Turn == lnwTurn.Right) {
            setMotor(lnwMotorCH.M1, speed) // M1 หมุนไปข้างหน้า
            setMotor(lnwMotorCH.M2, 0)     // M2 หยุด
        }
    }

    /**
     * Spin the robot in place (left or right).
     * @param Spin Direction to spin, eg: lnwSpin.Left
     * @param speed Speed (0 to 1023), eg: 512
     */
    //% blockId="lnw_spin" block="Spin %Spin|Speed %speed"
    //% speed.min=0 speed.max=1023
    //% group="Motor"
    export function Spin(Spin: lnwSpin, speed: number): void {
        if (Spin == lnwSpin.Left) {
            setMotor(lnwMotorCH.M1, -speed) // M1 หมุนถอยหลัง
            setMotor(lnwMotorCH.M2, speed)  // M2 หมุนไปข้างหน้า
        } else if (Spin == lnwSpin.Right) {
            setMotor(lnwMotorCH.M1, speed)  // M1 หมุนไปข้างหน้า
            setMotor(lnwMotorCH.M2, -speed) // M2 หมุนถอยหลัง
        }
    }

    /**
     * Stop both motors.
     */
    //% blockId="lnw_motorStop" block="Motor Stop"
    //% group="Motor"
    export function MotorStop(): void {
        setMotor(lnwMotorCH.M1, 0)
        setMotor(lnwMotorCH.M2, 0)
    }



    /**
 * Control Servo 1–4 set degree between 0–180
 * @param Degree servo degree 0–180, eg: 90
 */
    //% blockId="lnw_Servo" block="Servo %lnwServo|Degree %Degree"
    //% Degree.min=0 Degree.max=180
    //% weight=75
    //% group="Servo Motor"
    export function Servo(Servo: lnwServo, Degree: number): void {
        switch (Servo) {
            case lnwServo.SV1:
                pins.servoWritePin(AnalogPin.P9, Degree)
                break
            case lnwServo.SV2:
                pins.servoWritePin(AnalogPin.P10, Degree)
                break
            case lnwServo.SV3:
                pins.servoWritePin(AnalogPin.P11, Degree)
                break
            case lnwServo.SV4:
                pins.servoWritePin(AnalogPin.P12, Degree)
                break
        }
    }

    /**
     * Set Servo to free rotation
     * @param Servo Servo to stop
     */
    //% blockId="lnw_ServoStop" block="Servo Stop %lnwServo"
    //% weight=70
    //% group="Servo Motor"
    export function ServoStop(Servo: lnwServo): void {
        switch (Servo) {
            case lnwServo.SV1:
                pins.digitalWritePin(DigitalPin.P9, 0)
                break
            case lnwServo.SV2:
                pins.digitalWritePin(DigitalPin.P10, 0)
                break
            case lnwServo.SV3:
                pins.digitalWritePin(DigitalPin.P11, 0)
                break
            case lnwServo.SV4:
                pins.digitalWritePin(DigitalPin.P12, 0)
                break
        }
    }

    /**
     * Read ADC channel 0-7
     * @param ReadADC ADC channel to read
     */
    //% blockId="lnw_readADC" block="Read %lnwReadADC"
    //% weight=60
    //% group="Analog Input/Output"
    export function ReadADC(ReadADC: lnwReadADC): number {
        pins.i2cWriteNumber(72, ReadADC, NumberFormat.UInt8LE, false)
        return pins.i2cReadNumber(72, NumberFormat.UInt16BE, false)
    }
    /**
     * Write digital value to pin
     */
    //% blockId="lnw_writeDigital" block="Digital Write pin %pin|value %value"
    //% value.min=0 value.max=1
    //% weight=55
    //% group="Digital Input/Output"
    export function lnw_writeDigital(pin: lnwDigitalPin, value: number): void {
        pins.digitalWritePin(pin, value)
    }

    /**
     * Read digital value from pin
     */
    //% blockId="lnw_readDigital" block="Digital Read pin %pin"
    //% weight=50
    //% group="Digital Input/Output"
    export function lnw_readDigital(pin: lnwDigitalPin): number {
        return pins.digitalReadPin(pin)
    }
    /**
 * Read analog value from pin P0 - P12
 * @param pin Analog pin to read
 */
    //% blockId="lnw_readAnalog" block="Read analog pin %pin"
    //% weight=50
    //% group="Analog Input/Output"
    export function readAnalog(pin: lnwAnalogPin): number {
        switch (pin) {
            case lnwAnalogPin.P0: return pins.analogReadPin(AnalogPin.P0);
            case lnwAnalogPin.P1: return pins.analogReadPin(AnalogPin.P1);
            case lnwAnalogPin.P2: return pins.analogReadPin(AnalogPin.P2);
            case lnwAnalogPin.P3: return pins.analogReadPin(AnalogPin.P3);
            case lnwAnalogPin.P4: return pins.analogReadPin(AnalogPin.P4);
            case lnwAnalogPin.P5: return pins.analogReadPin(AnalogPin.P5);
            case lnwAnalogPin.P6: return pins.analogReadPin(AnalogPin.P6);
            case lnwAnalogPin.P7: return pins.analogReadPin(AnalogPin.P7);
            case lnwAnalogPin.P8: return pins.analogReadPin(AnalogPin.P8);
            default: return 0;
        }
    }
    /**
     * Write analog value (PWM) to pin P0 - P12
     * @param pin Analog pin to write to
     * @param value PWM value (0 - 1023)
     */
    //% blockId="lnw_analogWrite" block="Analog write %value|to pin %pin"
    //% weight=49
    //% group="Analog Input/Output"
    export function analogWrite(pin: lnwAnalogPin, value: number): void {
        value = Math.clamp(0, 1023, value);
        switch (pin) {
            case lnwAnalogPin.P0: pins.analogWritePin(AnalogPin.P0, value); break;
            case lnwAnalogPin.P1: pins.analogWritePin(AnalogPin.P1, value); break;
            case lnwAnalogPin.P2: pins.analogWritePin(AnalogPin.P2, value); break;
            case lnwAnalogPin.P3: pins.analogWritePin(AnalogPin.P3, value); break;
            case lnwAnalogPin.P4: pins.analogWritePin(AnalogPin.P4, value); break;
            case lnwAnalogPin.P5: pins.analogWritePin(AnalogPin.P5, value); break;
            case lnwAnalogPin.P6: pins.analogWritePin(AnalogPin.P6, value); break;
            case lnwAnalogPin.P7: pins.analogWritePin(AnalogPin.P7, value); break;
            case lnwAnalogPin.P8: pins.analogWritePin(AnalogPin.P8, value); break;

        }
    }

}
namespace lnw {
    //% block="OLED" weight=90 color=#FFA500 icon="\uf26c"
    export namespace oled {
        let addr = 0x3C
        let initialized = false

        //% block="initialize OLED"
        //% group="OLED"
        export function init(): void {
            if (initialized) return
            OLED12864_I2C.init(addr)
            clear()
            initialized = true
        }

        //% block="show string %text x %x y %y size %size"
        //% group="OLED"
        export function showString(text: string, x: number = 0, y: number = 0, size: number = 1): void {
            if (!initialized) init()
            OLED12864_I2C.showString(x, y, text, size)
        }

        //% block="show number %num x %x y %y size %size"
        //% group="OLED"
        export function showNumber(num: number, x: number = 0, y: number = 0, size: number = 1): void {
            if (!initialized) init()
            OLED12864_I2C.showString(x, y, num.toString(), size)
        }

        //% block="clear screen"
        //% group="OLED"
        export function clear(): void {
            OLED12864_I2C.clear()
        }
    }
}




