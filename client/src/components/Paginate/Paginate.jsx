import React from 'react'
import {
	BsFillArrowLeftCircleFill,
	BsFillArrowRightCircleFill,
} from 'react-icons/bs'

import './Paginate.scss'

const Paginate = ({
	resultsPerPage,
	results,
	paginate,
	currentPage,
	setCurrentPage,
	filter,
}) => {
	const pageNumbers = []

	// determine number of pages based on whether or not results are filterd
	if (!filter) {
		for (let i = 1; i <= Math.ceil(results.length / resultsPerPage); i++) {
			pageNumbers.push(i)
		}
	} else {
		const filteredResults = results.filter(
			(result) => result.favorite === true
		)
		for (
			let i = 1;
			i <= Math.ceil(filteredResults.length / resultsPerPage);
			i++
		) {
			pageNumbers.push(i)
		}
	}

	const previousPage = () => {
		if (currentPage !== 1) {
			setCurrentPage(currentPage - 1)
		}
	}

	const nextPage = () => {
		if (currentPage !== pageNumbers[pageNumbers.length - 1]) {
			setCurrentPage(currentPage + 1)
		}
	}

	return (
		<div className='pagination'>
			<ul className='pagination__container'>
				<li
					onClick={previousPage}
					className={`"pagination__number" ${
						currentPage === 1 ? 'disabled' : ''
					}`}>
					<BsFillArrowLeftCircleFill className='arrow' />
				</li>
				{pageNumbers.map((number) => (
					<li
						key={number}
						onClick={() => paginate(number)}
						className={`pagination__number ${
							number === currentPage ? 'active' : ''
						}`}>
						{number}
					</li>
				))}
				<li
					onClick={nextPage}
					className={`"pagination__number" ${
						currentPage === pageNumbers[pageNumbers.length - 1]
							? 'disabled'
							: ''
					}`}>
					<BsFillArrowRightCircleFill className='arrow' />
				</li>
			</ul>
		</div>
	)
}

export default Paginate
