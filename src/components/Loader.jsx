import { Icon } from './icons'

export default function Loader({ done }) {
  return (
    <div className={`loader ${done ? 'hidden' : ''}`}>
      <div className="loader-drop">
        <Icon.drop s={54} />
      </div>
      <div className="loader-bar">
        <i />
      </div>
      <div className="loader-text">MP Plumbing Solutions</div>
    </div>
  )
}
