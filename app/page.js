import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="container">
        <h1>Quiz App</h1>
        <Link href="/quiz"><button>Start Quiz</button></Link>
      </div>
    </>
  );
}
