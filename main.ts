let dx = 0
let dy = 0
let dz = 0
let ux = 0
let uy = 0
let uz = 0
let buf = control.createBuffer(12)
radio.setGroup(99)
basic.showIcon(IconNames.Heart)
radio.setTransmitPower(7)
xgo.init_xgo_serial(SerialPin.P2, SerialPin.P1)
basic.forever(function on_forever() {
    
    buf = control.createBuffer(8)
    ux = input.magneticForce(Dimension.X)
    dx = input.acceleration(Dimension.X)
    dy = input.acceleration(Dimension.Y)
    dz = input.acceleration(Dimension.Z)
    basic.showIcon(IconNames.Surprised)
    ux = input.magneticForce(Dimension.X)
    uy = input.magneticForce(Dimension.Y)
    uz = input.magneticForce(Dimension.Z)
    buf.setNumber(NumberFormat.Int16LE, 0, ux)
    buf.setNumber(NumberFormat.Int16LE, 2, ux)
    buf.setNumber(NumberFormat.Int16LE, 4, ux)
    buf.setNumber(NumberFormat.Int16LE, 6, dx)
    buf.setNumber(NumberFormat.Int16LE, 8, dy)
    buf.setNumber(NumberFormat.Int16LE, 12, dz)
    if (input.magneticForce(Dimension.Z) > 10) {
        basic.showIcon(IconNames.Happy)
        xgo.execution_action(xgo.action_enum.Request_feeding)
        soundExpression.giggle.playUntilDone()
    } else {
        basic.showIcon(IconNames.Confused)
        xgo.execution_action(xgo.action_enum.Crawl_forward)
        music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 4585, 4529, 255, 0, 79, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), SoundExpressionPlayMode.UntilDone)
    }
    
})
loops.everyInterval(3000, function on_every_interval() {
    radio.sendBuffer(buf)
    music.playSoundEffect(music.createSoundEffect(WaveShape.Triangle, 300, 200, 255, 0, 75, SoundExpressionEffect.None, InterpolationCurve.Curve), SoundExpressionPlayMode.UntilDone)
})
