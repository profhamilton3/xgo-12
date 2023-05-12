input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (ux > uz) {
        music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 54, 54, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
    }
    if (uy > uz) {
        music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 500, 499, 255, 0, 750, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
    }
})
let uz = 0
let uy = 0
let ux = 0
let dz = 0
let dy = 0
let dx = 0
let buf = control.createBuffer(12)
radio.setGroup(99)
basic.showIcon(IconNames.Meh)
radio.setTransmitPower(3)
xgo.init_xgo_serial(SerialPin.P2, SerialPin.P1)
loops.everyInterval(500, function () {
    radio.sendBuffer(buf)
})
basic.forever(function () {
    buf = control.createBuffer(12)
ux = input.magneticForce(Dimension.X)
    uy = input.magneticForce(Dimension.Y)
    uz = input.magneticForce(Dimension.Z)
    dx = input.acceleration(Dimension.X)
    dy = input.acceleration(Dimension.Y)
    dz = input.acceleration(Dimension.Z)
    buf.setNumber(NumberFormat.Int16LE, 0, ux)
buf.setNumber(NumberFormat.Int16LE, 2, uy)
buf.setNumber(NumberFormat.Int16LE, 4, uz)
buf.setNumber(NumberFormat.Int16LE, 6, dx)
buf.setNumber(NumberFormat.Int16LE, 8, dy)
buf.setNumber(NumberFormat.Int16LE, 10, dz)
})
