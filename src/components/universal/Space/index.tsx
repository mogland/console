interface Prop {
  height?: number
}

export const Space: React.FC<Prop> = (props) => {
  return (
    <>
      <div 
        style={{
          height: props.height || 0,
        }}
      />
    </>
  )
}