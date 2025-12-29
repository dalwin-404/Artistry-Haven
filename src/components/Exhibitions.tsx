import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import './Exhibitions.css';

interface Exhibition {
  id: number;
  title: string;
  image_url?: string | null;
  aic_start_at?: string | null;
  aic_end_at?: string | null;
  short_description?: string | null;
  status?: string | null;
}

interface ExhibitionsResponse {
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
  data: Exhibition[];
}

export default function Exhibitions() {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'current' | 'archive'>('current');

  useEffect(() => {
    async function fetchExhibitions() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          'https://api.artic.edu/api/v1/exhibitions?limit=50&fields=id,title,image_url,aic_start_at,aic_end_at,short_description,status'
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch exhibitions: ${response.statusText}`);
        }

        const data: ExhibitionsResponse = await response.json();
        setExhibitions(data.data || []);
      } catch (err) {
        console.error('Error fetching exhibitions:', err);
        setError(err instanceof Error ? err.message : 'Failed to load exhibitions');
      } finally {
        setLoading(false);
      }
    }

    fetchExhibitions();
  }, []);

  // Format date as "Month Day, Year"
  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return 'Date TBA';
    
    try {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      };
      return date.toLocaleDateString('en-US', options);
    } catch {
      return 'Date TBA';
    }
  };

  // Determine if exhibition is current or past
  const isCurrentExhibition = (exhibition: Exhibition): boolean => {
    if (!exhibition.aic_end_at) {
      // If no end date, consider it current if it has a start date in the past or future
      if (exhibition.aic_start_at) {
        const startDate = new Date(exhibition.aic_start_at);
        return startDate >= new Date() || startDate <= new Date();
      }
      return true; // Assume current if no dates
    }
    
    const endDate = new Date(exhibition.aic_end_at);
    return endDate >= new Date();
  };

  // Get exhibition status
  const getExhibitionStatus = (exhibition: Exhibition): 'on-view' | 'upcoming' => {
    if (!exhibition.aic_start_at) return 'upcoming';
    
    const startDate = new Date(exhibition.aic_start_at);
    const now = new Date();
    
    return startDate > now ? 'upcoming' : 'on-view';
  };

  // Separate exhibitions into current and past
  const currentExhibitions = exhibitions.filter(isCurrentExhibition);
  const pastExhibitions = exhibitions.filter((ex) => !isCurrentExhibition(ex));

  // Sort current exhibitions: upcoming first, then by start date
  const sortedCurrentExhibitions = [...currentExhibitions].sort((a, b) => {
    const aStart = a.aic_start_at ? new Date(a.aic_start_at).getTime() : 0;
    const bStart = b.aic_start_at ? new Date(b.aic_start_at).getTime() : 0;
    return aStart - bStart;
  });

  // Sort past exhibitions by end date (most recent first)
  const sortedPastExhibitions = [...pastExhibitions].sort((a, b) => {
    const aEnd = a.aic_end_at ? new Date(a.aic_end_at).getTime() : 0;
    const bEnd = b.aic_end_at ? new Date(b.aic_end_at).getTime() : 0;
    return bEnd - aEnd;
  });

  if (loading) {
    return (
      <div className="exhibitions">
        <div className="exhibitions-container">
          <div className="exhibitions-loading">
            <p>Loading exhibitions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="exhibitions">
        <div className="exhibitions-container">
          <div className="exhibitions-error">
            <h2>Error Loading Exhibitions</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="exhibitions">
      <div className="exhibitions-container">
        {/* Header */}
        <div className="exhibitions-header">
          <h1 className="exhibitions-title">Exhibitions</h1>
          
          {/* Tabs */}
          <div className="exhibitions-tabs">
            <button
              className={`exhibitions-tab ${activeTab === 'current' ? 'active' : ''}`}
              onClick={() => setActiveTab('current')}
            >
              Current View
            </button>
            <button
              className={`exhibitions-tab ${activeTab === 'archive' ? 'active' : ''}`}
              onClick={() => setActiveTab('archive')}
            >
              Archive
            </button>
          </div>
        </div>

        {/* Current Exhibitions Tab */}
        {activeTab === 'current' && (
          <div className="exhibitions-current">
            {sortedCurrentExhibitions.length === 0 ? (
              <div className="exhibitions-empty">
                <p>No current exhibitions available.</p>
              </div>
            ) : (
              <div className="exhibitions-current-list">
                {sortedCurrentExhibitions.map((exhibition) => {
                  const status = getExhibitionStatus(exhibition);
                  const dateRange = exhibition.aic_start_at && exhibition.aic_end_at
                    ? `${formatDate(exhibition.aic_start_at)} - ${formatDate(exhibition.aic_end_at)}`
                    : exhibition.aic_start_at
                    ? `Starting ${formatDate(exhibition.aic_start_at)}`
                    : 'Dates TBA';

                  return (
                    <div key={exhibition.id} className="exhibitions-current-card">
                      <div className="exhibitions-current-card-image-wrapper">
                        {exhibition.image_url ? (
                          <img
                            src={exhibition.image_url}
                            alt={exhibition.title}
                            className="exhibitions-current-card-image"
                          />
                        ) : (
                          <div className="exhibitions-image-placeholder">
                            <div className="exhibitions-image-placeholder-pattern"></div>
                            <p className="exhibitions-image-placeholder-text">
                              No Image Available
                            </p>
                          </div>
                        )}
                        <div className="exhibitions-current-card-overlay">
                          <div className="exhibitions-current-card-content">
                            <div className="exhibitions-current-card-header">
                              <h2 className="exhibitions-current-card-title">
                                {exhibition.title}
                              </h2>
                              <span
                                className={`exhibitions-status-badge ${
                                  status === 'on-view' ? 'on-view' : 'upcoming'
                                }`}
                              >
                                {status === 'on-view' ? 'On View' : 'Upcoming'}
                              </span>
                            </div>
                            <div className="exhibitions-current-card-date">
                              <Calendar size={18} />
                              <span>{dateRange}</span>
                            </div>
                            {exhibition.short_description && (
                              <p className="exhibitions-current-card-description">
                                {exhibition.short_description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Archive Tab */}
        {activeTab === 'archive' && (
          <div className="exhibitions-archive">
            {sortedPastExhibitions.length === 0 ? (
              <div className="exhibitions-empty">
                <p>No archived exhibitions available.</p>
              </div>
            ) : (
              <div className="exhibitions-archive-grid">
                {sortedPastExhibitions.map((exhibition) => {
                  const dateRange = exhibition.aic_start_at && exhibition.aic_end_at
                    ? `${formatDate(exhibition.aic_start_at)} - ${formatDate(exhibition.aic_end_at)}`
                    : exhibition.aic_end_at
                    ? `Ended ${formatDate(exhibition.aic_end_at)}`
                    : 'Dates TBA';

                  return (
                    <div key={exhibition.id} className="exhibitions-archive-card">
                      <div className="exhibitions-archive-card-image-wrapper">
                        {exhibition.image_url ? (
                          <img
                            src={exhibition.image_url}
                            alt={exhibition.title}
                            className="exhibitions-archive-card-image"
                          />
                        ) : (
                          <div className="exhibitions-image-placeholder exhibitions-image-placeholder-small">
                            <div className="exhibitions-image-placeholder-pattern"></div>
                            <p className="exhibitions-image-placeholder-text">
                              No Image Available
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="exhibitions-archive-card-content">
                        <h3 className="exhibitions-archive-card-title">
                          {exhibition.title}
                        </h3>
                        <div className="exhibitions-archive-card-date">
                          <Calendar size={16} />
                          <span>{dateRange}</span>
                        </div>
                        {exhibition.short_description && (
                          <p className="exhibitions-archive-card-description">
                            {exhibition.short_description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

