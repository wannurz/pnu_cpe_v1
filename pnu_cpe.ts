/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

/**
 * Motor directions
 */
enum cpeMotor {
    //% block="Forward"
    Forward,
    //% block="Backward"
    Backward
}

/**
 * Turn directions
 */
enum cpeTurn {
    //% block="Left"
    Left,
    //% block="Right"
    Right
}

/**
 * Spin directions
 */
enum cpeSpin {
    //% block="Left"
    Left,
    //% block="Right"
    Right
}

/**
 * Servo channels
 */
enum cpeServo {
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
enum cpeReadADC {
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
enum cpeMotorCH {
    //% block="M1"
    M1,
    //% block="M2"
    M2
}
/**
 * Digital pins for P0-P12
 */
enum cpeDigitalPin {
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
enum cpeAnalogPin {
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
enum cpeAnalogWrite {
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
* Custom motor control blocks for CPE_PNU
*/
//% block="CPE PNU" weight=100 color=#FFA500 icon="\uf085"
namespace cpe_pnu {

    /**
     * Control individual motor channel and direction.
     * @param Channel Motor channel
     * @param Direction Motor direction
     * @param Speed Speed (0 to 100), eg: 50
     */
    //% blockId="cpe_setMotor" block="setMotor %cpeMotorCH|Direction %cpeMotor|Speed %Speed"
    //% Speed.min=0 Speed.max=100
    //% weight=100
    //% group="Motor"
    export function setMotor(Channel: cpeMotorCH, Direction: cpeMotor, Speed: number): void {
        let motorspeed = pins.map(Speed, 0, 100, 0, 1023)

        if (Channel == cpeMotorCH.M1 && Direction == cpeMotor.Forward) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, motorspeed)
        }
        else if (Channel == cpeMotorCH.M2 && Direction == cpeMotor.Forward) {
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
        else if (Channel == cpeMotorCH.M1 && Direction == cpeMotor.Backward) {
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, motorspeed)
        }
        else if (Channel == cpeMotorCH.M2 && Direction == cpeMotor.Backward) {
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
    }

    /**
     * Turn the robot by running one motor.
     * @param Turn Direction to turn, eg: cpeTurn.Left
     * @param speed Speed (0 to 100), eg: 50
     */
    //% blockId="cpe_turn" block="Turn %cpeTurn|Speed %speed"
    //% speed.min=0 speed.max=100
    //% group="Motor"
    export function Turn(Turn: cpeTurn, speed: number): void {
        let motorspeed = pins.map(speed, 0, 100, 0, 1023)

        if (Turn == cpeTurn.Left) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, 0)
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
        else if (Turn == cpeTurn.Right) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, motorspeed)
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, 0)
        }
    }

    /**
     * Spin the robot in place (left or right).
     * @param Spin Direction to spin, eg: cpeSpin.Left
     * @param speed Speed (0 to 100), eg: 50
     */
    //% blockId="cpe_spin" block="Spin %cpeSpin|Speed %speed"
    //% speed.min=0 speed.max=100
    //% group="Motor"
    export function Spin(Spin: cpeSpin, speed: number): void {
        let motorspeed = pins.map(speed, 0, 100, 0, 1023)

        if (Spin == cpeSpin.Left) {
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, motorspeed)
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
        else if (Spin == cpeSpin.Right) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, motorspeed)
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
    }

    /**
     * Stop both motors.
     */
    //% blockId="cpe_motorStop" block="Motor Stop"
    //% group="Motor"
    export function MotorStop(): void {
        pins.digitalWritePin(DigitalPin.P13, 1)
        pins.analogWritePin(AnalogPin.P14, 0)
        pins.digitalWritePin(DigitalPin.P15, 1)
        pins.analogWritePin(AnalogPin.P16, 0)
    }


    /**
 * Control Servo 1–4 set degree between 0–180
 * @param Degree servo degree 0–180, eg: 90
 */
    //% blockId="cpe_Servo" block="Servo %cpeServo|Degree %Degree"
    //% Degree.min=0 Degree.max=180
    //% weight=75
    //% group="Servo Motor"
    export function Servo(Servo: cpeServo, Degree: number): void {
        switch (Servo) {
            case cpeServo.SV1:
                pins.servoWritePin(AnalogPin.P9, Degree)
                break
            case cpeServo.SV2:
                pins.servoWritePin(AnalogPin.P10, Degree)
                break
            case cpeServo.SV3:
                pins.servoWritePin(AnalogPin.P11, Degree)
                break
            case cpeServo.SV4:
                pins.servoWritePin(AnalogPin.P12, Degree)
                break
        }
    }

    /**
     * Set Servo to free rotation
     * @param Servo Servo to stop
     */
    //% blockId="cpe_ServoStop" block="Servo Stop %cpeServo"
    //% weight=70
    //% group="Servo Motor"
    export function ServoStop(Servo: cpeServo): void {
        switch (Servo) {
            case cpeServo.SV1:
                pins.digitalWritePin(DigitalPin.P9, 0)
                break
            case cpeServo.SV2:
                pins.digitalWritePin(DigitalPin.P10, 0)
                break
            case cpeServo.SV3:
                pins.digitalWritePin(DigitalPin.P11, 0)
                break
            case cpeServo.SV4:
                pins.digitalWritePin(DigitalPin.P12, 0)
                break
        }
    }

    /**
     * Read ADC channel 0-7
     * @param ReadADC ADC channel to read
     */
    //% blockId="cpe_readADC" block="Read %cpeReadADC"
    //% weight=60
    //% group="Analog Input/Output"
    export function ReadADC(ReadADC: cpeReadADC): number {
        pins.i2cWriteNumber(72, ReadADC, NumberFormat.UInt8LE, false)
        return pins.i2cReadNumber(72, NumberFormat.UInt16BE, false)
    }
    /**
     * Write digital value to pin
     */
    //% blockId="cpe_writeDigital" block="Digital Write pin %pin|value %value"
    //% value.min=0 value.max=1
    //% weight=55
    //% group="Digital Input/Output"
    export function cpe_writeDigital(pin: cpeDigitalPin, value: number): void {
        pins.digitalWritePin(pin, value)
    }

    /**
     * Read digital value from pin
     */
    //% blockId="cpe_readDigital" block="Digital Read pin %pin"
    //% weight=50
    //% group="Digital Input/Output"
    export function cpe_readDigital(pin: cpeDigitalPin): number {
        return pins.digitalReadPin(pin)
    }
    /**
 * Read analog value from pin P0 - P12
 * @param pin Analog pin to read
 */
    //% blockId="cpe_readAnalog" block="Read analog pin %pin"
    //% weight=50
    //% group="Analog Input/Output"
    export function readAnalog(pin: cpeAnalogPin): number {
        switch (pin) {
            case cpeAnalogPin.P0: return pins.analogReadPin(AnalogPin.P0);
            case cpeAnalogPin.P1: return pins.analogReadPin(AnalogPin.P1);
            case cpeAnalogPin.P2: return pins.analogReadPin(AnalogPin.P2);
            case cpeAnalogPin.P3: return pins.analogReadPin(AnalogPin.P3);
            case cpeAnalogPin.P4: return pins.analogReadPin(AnalogPin.P4);
            case cpeAnalogPin.P5: return pins.analogReadPin(AnalogPin.P5);
            case cpeAnalogPin.P6: return pins.analogReadPin(AnalogPin.P6);
            case cpeAnalogPin.P7: return pins.analogReadPin(AnalogPin.P7);
            case cpeAnalogPin.P8: return pins.analogReadPin(AnalogPin.P8);
            default: return 0;
        }
    }
    /**
     * Write analog value (PWM) to pin P0 - P12
     * @param pin Analog pin to write to
     * @param value PWM value (0 - 1023)
     */
    //% blockId="cpe_analogWrite" block="Analog write %value|to pin %pin"
    //% weight=49
    //% group="Analog Input/Output"
    export function analogWrite(pin: cpeAnalogPin, value: number): void {
        value = Math.clamp(0, 1023, value);
        switch (pin) {
            case cpeAnalogPin.P0: pins.analogWritePin(AnalogPin.P0, value); break;
            case cpeAnalogPin.P1: pins.analogWritePin(AnalogPin.P1, value); break;
            case cpeAnalogPin.P2: pins.analogWritePin(AnalogPin.P2, value); break;
            case cpeAnalogPin.P3: pins.analogWritePin(AnalogPin.P3, value); break;
            case cpeAnalogPin.P4: pins.analogWritePin(AnalogPin.P4, value); break;
            case cpeAnalogPin.P5: pins.analogWritePin(AnalogPin.P5, value); break;
            case cpeAnalogPin.P6: pins.analogWritePin(AnalogPin.P6, value); break;
            case cpeAnalogPin.P7: pins.analogWritePin(AnalogPin.P7, value); break;
            case cpeAnalogPin.P8: pins.analogWritePin(AnalogPin.P8, value); break;

        }
    }

}
namespace cpe_pnu {
    //% block="OLED" weight=90 color=#FFA500 icon="\uf26c"
    export namespace oled {



    /**
     * แสดงข้อความแบบ static
     */
    //% block="show string %text x %x y %y size %size"
    //% group="OLED"
    export function showString(text: string, x: number = 0, y: number = 0, size: number = 1): void {
        OLED12864_I2C.init(0x3C)
        OLED12864_I2C.clear()
        OLED12864_I2C.showString(x, y, text, size)
    }

    /**
     * Scroll ข้อความแนวนอน
     */
    //% block="scroll string horizontally %text speed %speed y %y size %size"
    //% speed.min=10 speed.max=200
    //% group="OLED"
    export function scrollHorizontal(text: string, speed: number, y: number = 0, size: number = 1): void {
        OLED12864_I2C.init(0x3C)
        OLED12864_I2C.clear()

        let textWidth = text.length * 6 * size  // 5 pixel + 1 space per char
        for (let offset = 0; offset <= textWidth; offset++) {
            OLED12864_I2C.clear()
            OLED12864_I2C.showString(-offset, y, text, size)
            basic.pause(speed)
        }
    }

    /**
     * Scroll ข้อความแนวตั้ง
     */
    //% block="scroll string vertically %text speed %speed x %x size %size"
    //% speed.min=10 speed.max=200
    //% group="OLED"
    export function scrollVertical(text: string, speed: number, x: number = 0, size: number = 1): void {
        OLED12864_I2C.init(0x3C)
        OLED12864_I2C.clear()

        let lineHeight = 8 * size
        let totalHeight = text.length * lineHeight

        for (let offset = 0; offset <= totalHeight; offset++) {
            OLED12864_I2C.clear()
            for (let i = 0; i < text.length; i++) {
                let y = i * lineHeight - offset
                if (y >= -lineHeight && y < 64) {
                    OLED12864_I2C.showString(x, y, text.charAt(i), size)
                }
            }
            basic.pause(speed)
        }
    }

    /**
     * ล้างหน้าจอ
     */
    //% block="clear screen"
    //% group="OLED"
    export function clear(): void {
        OLED12864_I2C.clear()
        }
    } // ปิด oled
} // ปิด cpe_pnu

