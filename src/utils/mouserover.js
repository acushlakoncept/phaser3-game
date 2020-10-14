export const mouseOverEffect = (obj) => {
    obj.on('pointerover', () => {
        obj.setTint(0xecdccc)
    })
    obj.on('pointerout', () => {
        obj.setTint()
    })
}