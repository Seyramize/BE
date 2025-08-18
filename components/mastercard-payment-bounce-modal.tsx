"use client"

import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

interface MastercardPaymentBounceModalProps {
	isOpen: boolean
	onClose: () => void
}

export function MastercardPaymentBounceModal({ isOpen, onClose }: MastercardPaymentBounceModalProps) {
	const router = useRouter()

	const handleClose = () => {
		onClose()
		router.push("/experiences")
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
					onClick={handleClose}
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						className="relative w-full max-w-3xl h-[320px] sm:h-[420px] md:h-[420px] rounded-xl overflow-hidden bg-cover bg-center shadow-2xl"
						style={{ backgroundImage: "url('/images/mastercard-image.jpg')" }}
						onClick={e => e.stopPropagation()}
					>
						<div className="absolute inset-0 bg-black/50" />
						<button
							onClick={handleClose}
							className="absolute right-4 top-4 z-10 flex items-center gap-2 text-white/90 transition-colors hover:text-white sm:right-6 sm:top-6"
						>
							<span className="text-xs">Close</span>
							<X className="h-5 w-5" />
						</button>
						<div className="relative z-10 flex h-full flex-col items-start justify-end p-8 pb-12 text-white sm:justify-center sm:p-12 md:p-16">
							<div className="max-w-md">
								<h2 className="mb-4 font-serif text-2xl leading-tight sm:text-5xl">
									Sorry, this experience is exclusive to mastercard holders.
								</h2>
								<p className="text-md text-white/90">
									Dont' fret. You can book other experiences from our catalog of experiences,
								</p>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
