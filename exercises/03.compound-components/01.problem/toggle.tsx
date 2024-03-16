import { useState, createContext, use } from 'react'
import { Switch } from '#shared/switch.tsx'

// 🐨 create your ToggleContext context here
// 📜 https://react.dev/reference/react/createContext
// 💰 the default value should be `null`
// 🦺 the typing for the context value should be `{on: boolean; toggle: () => void}`
// but because we must initialize it to `null`, you need to union that with `null`

const ToggleContext = createContext<{ on: boolean; toggle: () => void } | null>(
	null,
)

export function Toggle({ children }: { children: React.ReactNode }) {
	const [on, setOn] = useState(false)
	const toggle = () => setOn(!on)

	return (
		<ToggleContext.Provider value={{ on, toggle }}>
			{children}
		</ToggleContext.Provider>
	)
}

export function ToggleOn({ children }: { children: React.ReactNode }) {
	const toggleContext = use(ToggleContext)

	return <>{toggleContext?.on ? children : null}</>
}

export function ToggleOff({ children }: { children: React.ReactNode }) {
	const toggleContext = use(ToggleContext)

	return <>{toggleContext?.on ? null : children}</>
}

type ToggleButtonProps = Omit<React.ComponentProps<typeof Switch>, 'on'> & {
	on?: boolean
}
export function ToggleButton(props: ToggleButtonProps) {
	const toggleContext = use(ToggleContext)

	return (
		<Switch
			on={toggleContext?.on ?? false}
			onClick={toggleContext?.toggle}
			{...props}
		/>
	)
}

/*
eslint
	@typescript-eslint/no-unused-vars: "off",
*/
