export const asyncError = (passedFn) => (req, res, next) => {
    // console.log("Try Catch")
    return Promise.resolve(passedFn(req, res, next)).catch(next);
}