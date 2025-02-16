import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-background">
      <div className="mx-auto w-[min(100%_-_2.5rem,_1350px)] px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p>&copy; 2023 devlinks. All rights reserved.</p>
          <nav>
            <menu className="flex space-x-4">
              <li>
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-primary hover:underline">
                  Terms and Conditions
                </Link>
              </li>
            </menu>
          </nav>
        </div>
      </div>
    </footer>
  );
}
