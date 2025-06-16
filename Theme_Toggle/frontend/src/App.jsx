import ThemeToggle from './components/ThemeToggle';

export default function App() {
  return (
        <div className="min-h-screen transition-colors duration-500 bg-white text-black dark:bg-gray-900 dark:text-white">
            <div className="p-8">
                <ThemeToggle />
                <div className="mt-8">
                    <h1 className="text-4xl font-bold mb-4">Hello, Theme World!</h1>
                    <p className="text-lg mb-4">This background will change on toggle.</p>
                    <div className="p-6 rounded-lg bg-gray-100 dark:bg-gray-800 transition-colors duration-500">
                        <h2 className="text-xl font-semibold mb-2">Theme Demo Card</h2>
                        <p>This card also changes with the theme to demonstrate the toggle functionality.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
