import { useState, useEffect } from 'react'
import { AddItemForm } from "./AddItemForm"
import { WardrobeGrid } from './WardrobeGrid'
import { FilterBar } from './FilterBar'
import styles from './Wardrobe.module.css'
import { OutfitBuilder } from './OutfitBuilder'
import { OutfitList } from './OutfitList'
import { Navbar } from './Navbar'
import { About } from './About'
import { ConfirmModal } from './ConfirmModal'
import { InfoModal } from './InfoModal'

function App() {
  const [wardrobe, setWardrobe] = useState(() => {
    const saved = localStorage.getItem('wardrobe')
    return saved ? JSON.parse(saved) : []
  })
  const [filter, setFilter] = useState('All')
  const [selectedForOutfit, setSelectedForOutfit] = useState([])
  const [outfits, setOutfits] = useState(() => {
    const saved = localStorage.getItem('outfits')
    return saved ? JSON.parse(saved) : []
  })
  const [activeTab, setActiveTab] = useState('wardrobe')
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [infoMessage, setInfoMessage] = useState(null)

  useEffect(() => {
    localStorage.setItem('wardrobe', JSON.stringify(wardrobe))
  }, [wardrobe])

  useEffect(() => {
    localStorage.setItem('outfits', JSON.stringify(outfits))
  }, [outfits])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const handleAddItem = (item) => {
    setWardrobe([...wardrobe, item])
  }

  const handleDelete = (id) => {
    setWardrobe(wardrobe.filter((item) => item.id !== id))
  }

  const handleToggleFavorite = (id) => {
    setWardrobe(wardrobe.map((item) =>
      item.id === id ? { ...item, favorite: !item.favorite } : item
    ))
  }

  const handleToggleSelectForOutfit = (id) => {
    const alreadySelected = selectedForOutfit.includes(id)

    if (alreadySelected) {
      setSelectedForOutfit(selectedForOutfit.filter((itemId) => itemId !== id))
    } else {
      setSelectedForOutfit([...selectedForOutfit, id])
    }
  }

  const handleSaveOutfit = (name) => {
    const newOutfit = { id: Date.now(), name, itemIds: selectedForOutfit }
    setOutfits([...outfits, newOutfit])
    setSelectedForOutfit([])
  }

  const handleGenerateRandomOutfit = () => {
    const tops = wardrobe.filter((item) => item.category === 'Tops')
    const bottoms = wardrobe.filter((item) => item.category === 'Bottoms')
    const shoes = wardrobe.filter((item) => item.category === 'Shoes')

    if (tops.length === 0 || bottoms.length === 0 || shoes.length === 0) {
      setInfoMessage('Add at least one Top, Bottom, and Shoe to generate an outfit.')
      return
    }

    const handleRenameOutfit = (id, newName) => {
  setOutfits(outfits.map((outfit) =>
    outfit.id === id ? { ...outfit, name: newName } : outfit
  ))
}

    const randomTop = tops[Math.floor(Math.random() * tops.length)]
    const randomBottom = bottoms[Math.floor(Math.random() * bottoms.length)]
    const randomShoe = shoes[Math.floor(Math.random() * shoes.length)]

    setSelectedForOutfit([randomTop.id, randomBottom.id, randomShoe.id])
  }

  const handleDeleteOutfit = (id) => {
  setOutfits(outfits.filter((outfit) => outfit.id !== id))
}

  const handleResetAll = () => {
    setWardrobe([])
    setOutfits([])
    setSelectedForOutfit([])
    setShowResetConfirm(false)
  }

  const filteredWardrobe = filter === 'All'
    ? wardrobe
    : wardrobe.filter((item) => item.category === filter)

  return (
    <div className={`${styles.page} ${darkMode ? styles.dark : ''}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>StyleMate</h1>
        <button className={styles.darkToggle} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div className={styles.container}>
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'about' ? (
          <About />
        ) : (
          <>
            <AddItemForm onAdd={handleAddItem} onError={setInfoMessage} />
            <FilterBar currentFilter={filter} onFilterChange={setFilter} />
            <p className={styles.itemCount}>{wardrobe.length} {wardrobe.length === 1 ? 'item' : 'items'} in your wardrobe</p>
            <WardrobeGrid
              items={filteredWardrobe}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
              selectedForOutfit={selectedForOutfit}
              onToggleSelectForOutfit={handleToggleSelectForOutfit}
            />
            <button className={styles.randomButton} onClick={handleGenerateRandomOutfit}>🎲 Build a Look</button>
            <OutfitBuilder
              selectedForOutfit={selectedForOutfit}
              wardrobe={wardrobe}
              onSave={handleSaveOutfit}
              onError={setInfoMessage}
            />
            <OutfitList
            outfits={outfits}
            wardrobe={wardrobe}
            onDelete={handleDeleteOutfit}
            onRename={handleRenameOutfit}
            />

            <div className={styles.resetSection}>
              <button className={styles.resetButton} onClick={() => setShowResetConfirm(true)}>
                🗑️ Reset Wardrobe
              </button>
            </div>

            {showResetConfirm && (
              <ConfirmModal
                message="This will delete your entire wardrobe and all saved outfits. Are you sure?"
                onConfirm={handleResetAll}
                onCancel={() => setShowResetConfirm(false)}
              />
            )}

            {infoMessage && (
              <InfoModal message={infoMessage} onClose={() => setInfoMessage(null)} />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App