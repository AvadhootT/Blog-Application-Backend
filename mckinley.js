function largestPalindrome(n) {

}


const largest_palindrome_product = (n)=>{

    let upperLimit = Math.pow(10, n) - 1;
    let lowerLimit = 1 + Math.floor(upperLimit / 10);
    let maxProduct = 0;

    for (let i = upperLimit; i >= lowerLimit; i--) {
        for (let j = i; j >= lowerLimit; j--) {
            let product = i * j;
            if (product < maxProduct)
                break;
            if (isPalindrome(product) && product > maxProduct)
                maxProduct = product;
        }
    }
    return maxProduct;

}

