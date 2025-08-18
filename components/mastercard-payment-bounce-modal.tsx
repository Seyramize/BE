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
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
					onClick={handleClose}
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						className="relative w-full h-full bg-cover bg-center"
						style={{ backgroundImage: "url('/images/mastercard-modal-bg.jpg')" }}
						onClick={e => e.stopPropagation()}
					>
						<div className="absolute inset-0 bg-black/50" />
						<div className="relative z-10 flex flex-col items-start justify-center h-full p-8 text-white">
							<button onClick={handleClose} className="absolute top-8 right-8 text-white">
								<X size={24} />
								<span className="sr-only">Close</span>
							</button>

							<div className="max-w-md">
								<h2 className="text-4xl font-serif mb-4">
									Sorry, this experience is exclusive to Mastercard holders.
								</h2>
								<p className="text-lg">
									You can book other experiences from our catalog of experiences.
								</p>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
