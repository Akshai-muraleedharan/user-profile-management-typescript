

export const firstLetterToUpperCase = (str: string): string => {

    const letterToUppercase = str[0].toUpperCase() + str.substring(1)

    return letterToUppercase

} 