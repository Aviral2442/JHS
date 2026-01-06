export const convertTimeIntoUnix = (time: string): number => {
    const date = new Date(time);
    return Math.floor(date.getTime() / 1000);
}