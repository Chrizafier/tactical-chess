// import { Link, Stack, useRouter } from "expo-router";
import { useRouter } from 'expo-router'
import { useState, useEffect } from 'react'
import { Button, Card } from 'react-native-paper'
import { supabase } from '../App'

export default function Greet() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(_ => {
    async function getProfile() {
      const { data, error } = await supabase.auth.getUser()
      try {
        setFullName(data.user.user_metadata.full_name)
        setEmail(data.user.user_metadata.email)
      }
      catch {

        setFullName(`Anonymous${[
          `${Math.floor(Math.random() * 9)}`,
          `${Math.floor(Math.random() * 9)}`,
          `${Math.floor(Math.random() * 9)}`
        ].join('')}`
        )
        setEmail('please.sign.in@email.com')
      }
    }
    getProfile()
  })

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/login')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Card
      theme={{ dark: true }}
      style={{
        flex: 1 / 5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2a2a2a',
      }}
    >
      <Card.Title
        title={`Hi ${fullName}!`}
        subtitle={`Your email address is ${email}`}
        titleStyle={{ color: '#fff' }}
        subtitleStyle={{ color: '#ccc' }}
      />
      <Card.Actions>
        <Button
          mode='contained'
          type='submit'
          onPress={handleSubmit}
        >
          {email !== 'please.sign.in@email.com' ? 'Sign Out' : 'Sign In'}
        </Button>
      </Card.Actions>
    </Card>
  )
}