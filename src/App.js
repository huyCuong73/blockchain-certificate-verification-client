import { useEffect, useState } from "react";
import "./App.css";
import Tile from "./components/Tile/Tile";
import axios from "axios"

function App() {

	const [board, setBoard] = useState([])
	const [matrix, setMatrix] = useState([])
	const [slideable, setSlideable] = useState([])    
	const [guide, setGuide] = useState([])  
	const [size, setSize] = useState(4)
	const [h, setH] = useState(1)
	const [config, setConfig] = useState([])
	const [solving, setSolving] = useState(false)
	const [mTime, setMTime] = useState("0")
	const [lTime, setLTime] = useState("0")
	// const [count, setCount] = useState(0)

	console.log(mTime);

	useEffect(() => {
		setMatrix(toMatrix(board,size))
	},[board])

	useEffect(() => {
		if(size == 4){
			setBoard([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0])
		}
		if(size == 3){
			setBoard([1,2,3,4,5,6,7,8,0])
		}
	},[size])


	useEffect(() => {
		let elements = []
		if(matrix.length !== 0){
			const index0 = findIndex(matrix,0)
			const r = index0[0]
			const c = index0[1]
			elements = [ 
				c > 0 && matrix[r][c-1], 
				c < matrix[0].length - 1 && matrix[r][c+1],
				r > 0 && matrix[r-1][c],
				r < matrix.length - 1 && matrix[r+1][c]
			]
		}
		setSlideable([...elements])
	},[matrix])

	useEffect(() => {
		if(guide.length !== 0){
		  let count = 0;
		  // save the interval ID in a variable
		  const id = setInterval(() => {
			count += 1;

			setBoard(guide[count]);
			// check the condition and clear the interval if true
			if (count === guide.length - 1) {
			  clearInterval(id);
			}
		  }, 50);
		}
	  },[guide]);
            
	function toMatrix (arr, width) {
		return arr.reduce (function (rows, key, index) {
		  return (index % width == 0 ? rows.push ( [key]) : rows[rows.length-1].push (key)) && rows;
		}, []);
	}

	function findIndex(array, value) {
		let rowIndex = array.findIndex(row => row.includes(value)); 
		if (rowIndex !== -1) { 
		  let colIndex = array[rowIndex].indexOf(value); 
		  return [rowIndex, colIndex]; 
		}
		return -1; 
	  }
	  


	const handleSlide = (e) => {
		const array = [...board]
		for (let i = 0 ; i < array.length; i++){
			if(array[i] === e){
				array[i] = 0
				continue
			}
			if(array[i] === 0){
				array[i] = e
			}

		}

		setBoard(array)
	}

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
		  let j = Math.floor(Math.random() * (i + 1));
		  [array[i], array[j]] = [array[j], array[i]];
		}
		setBoard([...array]);
	}


	return (
		<div className="App">
		<h1>Sliding puzzle</h1>
		<div className="boardContainer">
			<div className="setting">
				<div className="title">
					Cài đặt
				</div>
				<div className="size">
					<div className="label1">Kích thước:</div>
					<div className="size-option">
						<div className="size-input">
							<input type="radio" checked={size == 4} value={4} onChange = {(e) => setSize(e.target.value)}/>
							4*4
						</div>
						<div className="size-input">
							<input type="radio" checked={size == 3} value={3} onChange = {(e) => setSize(e.target.value)}/>
							3*3
						</div>
					</div>
				</div>

				<div className="h">
					<div className="label1">Heuristic:</div>
					<div className="h-option">
						<div className="h-input">
							<input type="radio" checked={h == 1} value={1} onChange = {(e) => setH(e.target.value)}/>
							{
								`Manhattan distance  (${mTime})`
							}
						</div>
						<div className="h-input">
							<input type="radio" checked={h == 2} value={2} onChange = {(e) => setH(e.target.value)}/>
							{
								`Linear Conflict Heuristic (${lTime})`
							}
						</div>
					</div>
				</div>

				<div className="config">
					<div>
						{`Config: `}
						{board.map((e,i) => {
							if(i == 0){
								return(
									<small>
										{`[ ${e}, `}
									</small>

								)
							}

							else if(i == size*size -1){
								return(
									<small>
										{`${e} ]`}
									</small>

								)
							}

							else{
								return(
									<small>
										{e}, <span> </span>
									</small>

								)
							}
						}
						)}
					</div>

					<div>
						<button className="saveBtn" onClick = {() => {
							setConfig([...board])
						}}>
							Lưu
						</button>

						<button className="applyBtn" onClick = {() => {
							setBoard([...config])
						}}>
							Áp dụng
						</button>
					</div>

					<div className="save_config">
						<div>
							{`Saved config: `}
							{config.map((e,i) => {
								if(i == 0){
									return(
										<small>
											{`[ ${e}, `}
										</small>

									)
								}

								else if(i == size*size -1){
									return(
										<small>
											{`${e} ]`}
										</small>

									)
								}

								else{
									return(
										<small>
											{e}, <span> </span>
										</small>

									)
								}
							}
							)}
						</div>
					</div>

				</div>
			
				<div className="control">
					<button onClick = {() => shuffleArray(board)}>Start</button>
					<button onClick = {() => {
						setSolving(true)
						axios.post("http://localhost:8000/solve",{
							dimensions: size,
							board: board,
							h
						})
							.then(res => {
								setGuide(res.data.result)
								setSolving(false)
								if(res.data.linear_time){
									setLTime(res.data.linear_time.toFixed(4))
								}
								if(res.data.mahattan_time){
									setMTime(res.data.mahattan_time.toFixed(4))
								}
							})
					}}>
						{
							solving 
							?
							<div>solving...</div>
							:
							<div>solve</div>
						}
						</button>
				</div>
			</div>
			<div className="boardWrapper">
				<div className="board">
					{
						matrix.map((row, i) => (
							<div className="row">
								{
									row.map( (e,j) => 
									<>	
										<Tile
											index = {e} 
											row = {row}
											col = {j}
											a = {board}
											size = {size}
											slideable = {slideable}
											handleSlide = {handleSlide}
										/>
									</>
									)
								}
							</div>
						))
					}
				</div>
			</div>
		</div>


		</div>
	);
}

export default App;
