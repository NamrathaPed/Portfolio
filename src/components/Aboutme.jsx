export default function Aboutme() {
    const handleClick = () => {
        alert('About me button clicked!')
    };
    return (
        <button
        onClick={handleClick}
        className="fixed top-4 left-20  bg-teal-300 hover:bg-teal-500 text-black font-bold py-2 px-4 rounded"
        >
        About me
        </button>
    );
}