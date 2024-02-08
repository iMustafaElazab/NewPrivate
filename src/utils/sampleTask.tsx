/**
 * hooks state used to assign value
 */

// export default React.memo(() => {
//   const [count, setCount] = useState(0);
//   return (
//     <View>
//       <Text>{count}</Text>
//       <Button onPress={() => setCount(count + 1)}>increase</Button>
//       <Button onPress={() => setCount(count - 1)} disabled={count === 0}>
//         descrease
//       </Button>
//     </View>
//   );
// });

/**
 * hooks useEffect used to make a side effect like call local stoarge or api call
 */

// export default React.memo(() => {
//   const [data, setData] = useState();
//   useEffect(() => {
//     fetch('https://api.example.com/data')
//       .then(response => response.json())
//       .then(data => setData(data));
//   }, []);
//   return (
//     <>
//       <Text>{JSON.stringify(data)}</Text>
//     </>
//   );
// });
/**
 * hooks reducer used to make a reducer to make multiaction
 */
// export default React.memo(() => {
//   interface CounterState {
//     count: number;
//   }

//   const initCounterValue = {
//     count: 0,
//   } as CounterState;

//   const counterReducer = (state: CounterState, action: {type: string}) => {
//     switch (action.type) {
//       case 'increase':
//         return {count: state.count + 1};
//       case 'decrease':
//         return {count: state.count - 1};
//       default:
//         return state;
//     }
//   };

//   const [state, dispatch] = useReducer(counterReducer, initCounterValue);

//   return (
//     <View>
//       <Text>{state.count}</Text>
//       <Button onPress={() => dispatch({type: 'increase'})}>increase</Button>
//       <Button
//         onPress={() => dispatch({type: 'decrease'})}
//         disabled={state.count === 0}>
//         descrease
//       </Button>
//     </View>
//   );
// });

/**
 * hooks useContext i will use it to pass data from comp to another
 */

// export const CreateAContext = createContext('');

// export default React.memo(() => {
//   return (
//     <>
//       <CreateAContext.Provider value="ahmed">
//         <CompA />
//         <SharedComp />
//       </CreateAContext.Provider>
//     </>
//   );
// });

// const SharedComp = () => {
//   const contextValue = useContext(CreateAContext);
//   return <Text>{contextValue}</Text>;
// };

// const CompA = () => {
//   const contextValue = useContext(CreateAContext);
//   return (
//     <View>
//       <Text>{contextValue}</Text>
//     </View>
//   );
// };

/**
 * useMemo
 * use it for performace it is use with value and cache it and change depend on dependancy array
 */
// export default React.memo(() => {
//   const price: number = 50;
//   const deliveryFee: number = 5;

//   const total = () => {
//     return price + deliveryFee;
//   };

//   const total2 = useMemo(() => {
//     return price + deliveryFee;
//   }, [price, deliveryFee]);

//   return (
//     <>
//       <Text>{total()}</Text>
//       <Text>{total2}</Text>
//     </>
//   );
// });

/**
 * useCallback
 * use it for performace it is with fuc and cache value to not render every time it render only on dependancy array
 */
// export default React.memo(() => {
//   const getLogMessage = (message: string) => {
//     return `## Example: ${message}`;
//   };

//   const count: number = 1;

//   const makeLog = useCallback(() => {
//     console.info(getLogMessage('message'), count);
//   }, [count]);

//   return <>{makeLog()}</>;
// });


/**
 * class compoent
 */

// class CounterClass extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 0,
//     };
//   }

//   increaseCount = () => {
//     this.setState((prevState) => ({
//       count: prevState.count + 1,
//     }));
//   };

//   decreaseCount = () => {
//     if (this.state.count > 0) {
//       this.setState((prevState) => ({
//         count: prevState.count - 1,
//       }));
//     }
//   };

//   render() {
//     return (
//       <View>
//         <Text>{this.state.count}</Text>
//         <Button title="Increase" onPress={this.increaseCount} />
//         <Button
//           title="Decrease"
//           onPress={this.decreaseCount}
//           disabled={this.state.count === 0}
//         />
//       </View>
//     );
//   }
// }

// export default CounterClass;
