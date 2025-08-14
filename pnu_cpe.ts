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
                pins.servoSetPulse(AnalogPin.P9, 0)
                break
            case cpeServo.SV2:
                pins.servoSetPulse(AnalogPin.P10, 0)
                break
            case cpeServo.SV3:
                pins.servoSetPulse(AnalogPin.P11, 0)
                break
            case cpeServo.SV4:
                pins.servoSetPulse(AnalogPin.P12, 0)
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

namespace led {
    /**
     * Show text (A–Z, a–z, 0–9) on LED display
     */
    //% block="show string"
    //% group="more"
    export function showString(text: string): void {
        const font: { [key: string]: number[] } = {
            "A": [0x1F, 0x05, 0x05, 0x1F, 0x00],
            "B": [0x1F, 0x15, 0x15, 0x0A, 0x00],
            "C": [0x0E, 0x11, 0x11, 0x11, 0x00],
            "D": [0x1F, 0x11, 0x11, 0x0E, 0x00],
            "E": [0x1F, 0x15, 0x15, 0x11, 0x00],
            "F": [0x1F, 0x05, 0x05, 0x01, 0x00],
            "G": [0x0E, 0x11, 0x15, 0x1D, 0x00],
            "H": [0x1F, 0x04, 0x04, 0x1F, 0x00],
            "I": [0x11, 0x1F, 0x11, 0x00, 0x00],
            "J": [0x08, 0x10, 0x10, 0x0F, 0x00],
            "K": [0x1F, 0x04, 0x0A, 0x11, 0x00],
            "L": [0x1F, 0x10, 0x10, 0x10, 0x00],
            "M": [0x1F, 0x02, 0x04, 0x02, 0x1F],
            "N": [0x1F, 0x02, 0x04, 0x1F, 0x00],
            "O": [0x0E, 0x11, 0x11, 0x0E, 0x00],
            "P": [0x1F, 0x05, 0x05, 0x02, 0x00],
            "Q": [0x0E, 0x11, 0x19, 0x1E, 0x00],
            "R": [0x1F, 0x05, 0x0D, 0x12, 0x00],
            "S": [0x12, 0x15, 0x15, 0x09, 0x00],
            "T": [0x01, 0x1F, 0x01, 0x00, 0x00],
            "U": [0x0F, 0x10, 0x10, 0x0F, 0x00],
            "V": [0x07, 0x08, 0x10, 0x08, 0x07],
            "W": [0x1F, 0x08, 0x04, 0x08, 0x1F],
            "X": [0x11, 0x0A, 0x04, 0x0A, 0x11],
            "Y": [0x01, 0x02, 0x1C, 0x02, 0x01],
            "Z": [0x19, 0x15, 0x13, 0x00, 0x00],
            "a": [0x08, 0x14, 0x14, 0x1C, 0x00],
            "b": [0x1F, 0x14, 0x14, 0x08, 0x00],
            "c": [0x0C, 0x12, 0x12, 0x00, 0x00],
            "d": [0x08, 0x14, 0x14, 0x1F, 0x00],
            "e": [0x0C, 0x1A, 0x16, 0x0C, 0x00],
            "f": [0x04, 0x1E, 0x05, 0x00, 0x00],
            "g": [0x0C, 0x12, 0x12, 0x0F, 0x00],
            "h": [0x1F, 0x04, 0x04, 0x18, 0x00],
            "i": [0x00, 0x1D, 0x00, 0x00, 0x00],
            "j": [0x10, 0x10, 0x0D, 0x00, 0x00],
            "k": [0x1F, 0x08, 0x14, 0x00, 0x00],
            "l": [0x11, 0x1F, 0x10, 0x00, 0x00],
            "m": [0x1C, 0x04, 0x18, 0x04, 0x18],
            "n": [0x1C, 0x04, 0x04, 0x18, 0x00],
            "o": [0x0C, 0x12, 0x12, 0x0C, 0x00],
            "p": [0x1C, 0x0A, 0x0A, 0x04, 0x00],
            "q": [0x04, 0x0A, 0x0A, 0x1C, 0x00],
            "r": [0x1C, 0x04, 0x04, 0x00, 0x00],
            "s": [0x14, 0x1A, 0x0A, 0x00, 0x00],
            "t": [0x04, 0x1F, 0x14, 0x00, 0x00],
            "u": [0x0C, 0x10, 0x10, 0x1C, 0x00],
            "v": [0x0C, 0x10, 0x08, 0x04, 0x00],
            "w": [0x1C, 0x10, 0x0C, 0x10, 0x1C],
            "x": [0x12, 0x0C, 0x0C, 0x12, 0x00],
            "y": [0x0C, 0x10, 0x0C, 0x02, 0x1C],
            "z": [0x1A, 0x16, 0x12, 0x00, 0x00],
            "0": [0x0E, 0x11, 0x11, 0x0E, 0x00],
            "1": [0x04, 0x0C, 0x04, 0x0E, 0x00],
            "2": [0x0E, 0x09, 0x12, 0x1F, 0x00],
            "3": [0x0E, 0x09, 0x0A, 0x0E, 0x00],
            "4": [0x12, 0x12, 0x1F, 0x10, 0x00],
            "5": [0x1F, 0x11, 0x0F, 0x00, 0x00],
            "6": [0x0E, 0x11, 0x0F, 0x00, 0x00],
            "7": [0x1F, 0x01, 0x02, 0x00, 0x00],
            "8": [0x0E, 0x0E, 0x0E, 0x00, 0x00],
            "9": [0x0E, 0x12, 0x0E, 0x00, 0x00]
        };

        for (let char of text) {
            if (font[char]) {
                let bitmap = font[char];
                for (let y = 0; y < 5; y++) {
                    for (let x = 0; x < 5; x++) {
                        if (((bitmap[y] >> (4 - x)) & 0x01) == 1) {
                            led.plot(x, y);
                        } else {
                            led.unplot(x, y);
                        }
                    }
                }
                basic.pause(500);
                basic.clearScreen();
            }
        }
    }
}
