import TodoAppProvider from "@/context/TodoAppContext";
import Image from "next/image";
import Link from "next/link";
import TaskList from "@/components/TaskList";

export default function Home() {
  return (
    
    <main className="min-h-screen p-4">
      <nav className="bg-gray-800 p-4 rounded-lg mb-8">
        <ul className="flex space-x-6">
          <li>
            <Link href="/addTask" className="text-white hover:text-gray-300">
              New Task
            </Link>
          </li>
      
        </ul>
      </nav>

      <TaskList />
    </main>
    
  );
}
