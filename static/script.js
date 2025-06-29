// Writing Prompt:
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("prompt").addEventListener("click", randomPrompt);
});

const arr = ["How would your life look if your phone search history was a person?",
"What’s the weirdest thing you’ve asked AI or Google?",
"What’s a 'low point' moment you turned into a personality trait?",
"If your anxiety had a catchphrase, what would it be?",
"What’s a 'low point' moment you turned into a personality trait?",
"What’s the pettiest reason you’ve stopped liking someone?",
"What’s your 'rock bottom' story that now makes people laugh?",
"What’s your go-to lie on dating apps?",
"What would your ex say is your 'quirky flaw'?",
"What’s the weirdest thing you’ve asked AI or Google?",
"What’s your most creative way of avoiding social interaction?",
"What’s something everyone pretends to understand at work—but doesn’t?"
];

function randomPrompt() {
    const randomValue = arr[Math.floor(Math.random() * arr.length)];
    document.getElementById("prompt-text").innerHTML = randomValue;
}