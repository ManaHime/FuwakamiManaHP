export const load = (async () => {
    const htmlData = await fetch('https://na.finalfantasyxiv.com/lodestone/character/8989233/')
    const parsedHtml = await htmlData.text()
    return {parsedHtml};
})