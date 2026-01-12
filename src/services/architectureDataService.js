// src/services/architectureDataService.js
import { supabase } from '../lib/supabaseClient';

// ============================================
// ARCHITECTURE CATALOG SERVICE
// ============================================

/**
 * Fetch Architecture Catalog dengan caching
 * @returns {Promise<Object>} Object dengan key berdasarkan phase
 */
export const fetchArchitectureData = async () => {
  const CACHE_KEY = 'architecture_catalog_data';
  const CACHE_TIME_KEY = 'architecture_catalog_cache_time';
  const CACHE_DURATION = 5 * 60 * 1000; // 5 menit

  try {
    // Cek cache terlebih dahulu
    const cached = localStorage.getItem(CACHE_KEY);
    const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
    const now = Date.now();

    if (cached && cacheTime && (now - parseInt(cacheTime)) < CACHE_DURATION) {
      console.log('📦 Using cached architecture data');
      return JSON.parse(cached);
    }

    console.log('🔄 Fetching fresh architecture data from Supabase...');

    // Delay kecil untuk avoid rate limit
    await new Promise(resolve => setTimeout(resolve, 100));

    const { data, error } = await supabase
      .from('architecture_catalog')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;

    // Transform data ke format yang sama dengan data lama
    const architectureData = {
      vision: [],
      business: [],
      data: [],
      application: [],
      technology: [],
      implementation: []
    };

    data.forEach(item => {
      architectureData[item.phase].push({
        id: item.item_id,
        title: item.title,
        type: item.type,
        description: item.description,
        fileUrl: item.file_url
      });
    });

    // Simpan ke cache
    localStorage.setItem(CACHE_KEY, JSON.stringify(architectureData));
    localStorage.setItem(CACHE_TIME_KEY, now.toString());

    return architectureData;
  } catch (error) {
    console.error('❌ Error fetching architecture data:', error);
    throw error;
  }
};

/**
 * Fetch Architecture Catalog berdasarkan phase tertentu
 * @param {string} phase - 'vision', 'business', 'data', 'application', 'technology', 'implementation'
 * @returns {Promise<Array>} Array of items
 */
export const fetchArchitectureByPhase = async (phase) => {
  try {
    const { data, error } = await supabase
      .from('architecture_catalog')
      .select('*')
      .eq('phase', phase)
      .order('order_index', { ascending: true });

    if (error) throw error;

    return data.map(item => ({
      id: item.item_id,
      title: item.title,
      type: item.type,
      description: item.description,
      fileUrl: item.file_url
    }));
  } catch (error) {
    console.error(`❌ Error fetching ${phase} data:`, error);
    throw error;
  }
};

// ============================================
// VALUE CHAIN SERVICE
// ============================================

/**
 * Fetch Value Chain Data dengan caching
 * @returns {Promise<Object>} Object dengan key berdasarkan component ID
 */
export const fetchValueChainData = async () => {
  const CACHE_KEY = 'value_chain_data';
  const CACHE_TIME_KEY = 'value_chain_cache_time';
  const CACHE_DURATION = 5 * 60 * 1000; // 5 menit

  try {
    // Cek cache terlebih dahulu
    const cached = localStorage.getItem(CACHE_KEY);
    const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
    const now = Date.now();

    if (cached && cacheTime && (now - parseInt(cacheTime)) < CACHE_DURATION) {
      console.log('📦 Using cached value chain data');
      return JSON.parse(cached);
    }

    console.log('🔄 Fetching fresh value chain data from Supabase...');

    // Delay kecil untuk avoid rate limit
    await new Promise(resolve => setTimeout(resolve, 100));

    const { data, error } = await supabase
      .from('value_chain_components')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;

    // Transform data ke format yang sama dengan data lama
    const valueChainData = {};
    data.forEach(item => {
      valueChainData[item.id] = {
        title: item.title,
        description: item.description,
        category: item.category
      };
    });

    // Simpan ke cache
    localStorage.setItem(CACHE_KEY, JSON.stringify(valueChainData));
    localStorage.setItem(CACHE_TIME_KEY, now.toString());

    return valueChainData;
  } catch (error) {
    console.error('❌ Error fetching value chain data:', error);
    throw error;
  }
};

/**
 * Fetch Value Chain berdasarkan kategori
 * @param {string} category - 'primary' atau 'support'
 * @returns {Promise<Array>} Array of components
 */
export const fetchValueChainByCategory = async (category) => {
  try {
    const { data, error } = await supabase
      .from('value_chain_components')
      .select('*')
      .eq('category', category)
      .order('order_index', { ascending: true });

    if (error) throw error;

    return data.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      category: item.category
    }));
  } catch (error) {
    console.error(`❌ Error fetching ${category} value chain:`, error);
    throw error;
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Clear semua cache
 */
export const clearAllCache = () => {
  localStorage.removeItem('architecture_catalog_data');
  localStorage.removeItem('architecture_catalog_cache_time');
  localStorage.removeItem('value_chain_data');
  localStorage.removeItem('value_chain_cache_time');
  console.log('🗑️ All cache cleared');
};

/**
 * Get cache status
 */
export const getCacheStatus = () => {
  const archCacheTime = localStorage.getItem('architecture_catalog_cache_time');
  const vcCacheTime = localStorage.getItem('value_chain_cache_time');
  
  return {
    architectureCached: !!archCacheTime,
    architectureCacheAge: archCacheTime ? Date.now() - parseInt(archCacheTime) : null,
    valueChainCached: !!vcCacheTime,
    valueChainCacheAge: vcCacheTime ? Date.now() - parseInt(vcCacheTime) : null
  };
};