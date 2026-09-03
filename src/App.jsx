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

const sampleWardrobe = [
  { id: 1001, name: 'White Tee', category: 'Tops', color: 'White', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300', favorite: false },
  { id: 1002, name: 'Blue Jeans', category: 'Bottoms', color: 'Blue', imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300', favorite: false },
  { id: 1003, name: 'White Sneakers', category: 'Shoes', color: 'White', imageUrl: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=300', favorite: true },
  { id: 1004, name: 'Denim Jacket', category: 'Outerwear', color: 'Blue', imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300', favorite: false },
  { id: 1005, name: 'Black Cap', category: 'Accessories', color: 'Black', imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300', favorite: false },
]

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

    const randomTop = tops[Math.floor(Math.random() * tops.length)]
    const randomBottom = bottoms[Math.floor(Math.random() * bottoms.length)]
    const randomShoe = shoes[Math.floor(Math.random() * shoes.length)]

    setSelectedForOutfit([randomTop.id, randomBottom.id, randomShoe.id])
  }

  const handleUpdateOutfit = (id, newName, newItemIds) => {
    setOutfits(outfits.map((outfit) =>
      outfit.id === id ? { ...outfit, name: newName, itemIds: newItemIds } : outfit
    ))
  }

  const handleDeleteOutfit = (id) => {
    setOutfits(outfits.filter((outfit) => outfit.id !== id))
  }

  const handleUpdateItem = (id, updatedFields) => {
    setWardrobe(wardrobe.map((item) =>
      item.id === id ? { ...item, ...updatedFields } : item
    ))
  }

  const handleResetAll = () => {
    setWardrobe([])
    setOutfits([])
    setSelectedForOutfit([])
    setShowResetConfirm(false)
  }

  const handleLoadDemoData = () => {
    setWardrobe(sampleWardrobe)
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
            {wardrobe.length === 0 && (
              <button className={styles.demoButton} onClick={handleLoadDemoData}>
                ✨ Load Demo Data
              </button>
            )}
            <FilterBar currentFilter={filter} onFilterChange={setFilter} />
            <p className={styles.itemCount}>{wardrobe.length} {wardrobe.length === 1 ? 'item' : 'items'} in your wardrobe</p>
            <WardrobeGrid
              items={filteredWardrobe}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
              selectedForOutfit={selectedForOutfit}
              onToggleSelectForOutfit={handleToggleSelectForOutfit}
              onUpdateItem={handleUpdateItem}
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
              onUpdate={handleUpdateOutfit}
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