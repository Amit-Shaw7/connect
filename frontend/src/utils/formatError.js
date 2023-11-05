export const formatErrorMessage = (errorMessage) => {
    const words = errorMessage.toLowerCase().split('_');

    // Capitalize the first letter of the entire sentence and join the words
    const formattedErrorMessage = words.map((word, index) => {
        if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
    }).join(' ');

    return formattedErrorMessage;
}