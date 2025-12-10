// assets/js/main.js

// Simple FAQ accordion behavior
document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".faq-question");

  // If the page has no FAQ questions (like index or mission-history), do nothing
  if (!questions.length) return;

  questions.forEach(question => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const isOpen = answer.classList.contains("open");

      // Close any other open answers
      document.querySelectorAll(".faq-answer.open").forEach(a => {
        if (a !== answer) {
          a.classList.remove("open");
        }
      });

      // Toggle this one
      if (isOpen) {
        answer.classList.remove("open");
      } else {
        answer.classList.add("open");
      }
    });

    // Keyboard support: Enter or Space toggles the answer
    question.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        question.click();
      }
    });
  });
});

